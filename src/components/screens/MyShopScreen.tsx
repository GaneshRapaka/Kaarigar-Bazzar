import React, { useState } from 'react';
import { Plus, Languages } from 'lucide-react';
import { ProductItem } from '../../types';
import { useLanguage } from '../../services/i18n';
import { ProductTranslationModal } from '../common/ProductTranslationModal';

interface MyShopScreenProps {
  products: ProductItem[];
  onAddNew: () => void;
  onSelectProduct?: (product: ProductItem) => void;
}

export const MyShopScreen: React.FC<MyShopScreenProps> = ({
  products,
  onAddNew,
  onSelectProduct: _onSelectProduct,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'drafts'>('all');
  const [translatingProduct, setTranslatingProduct] = useState<ProductItem | null>(null);

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'live') return p.status === 'live';
    if (activeTab === 'drafts') return p.status === 'draft' || p.status === 'paused';
    return true;
  });

  const liveCount = products.filter((p) => p.status === 'live').length;
  const draftCount = products.filter((p) => p.status === 'draft' || p.status === 'paused').length;

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#101415] text-[#e0e3e5] overflow-y-auto select-none space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-xl font-bold text-white tracking-tight font-mono">
          {t('shop.title')}
        </h1>
        <button
          onClick={onAddNew}
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-mono font-bold py-2 px-3.5 rounded-xl shadow-glow-blue transition flex items-center gap-1.5 active:scale-95 border border-[#b4c5ff]/30"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>{t('shop.addNew')}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#191c1e] rounded-xl border border-[#1E293B] shadow-sm font-mono">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'all'
              ? 'bg-[#2563eb] text-white shadow-glow-blue'
              : 'text-[#8d90a0] hover:text-white'
          }`}
        >
          {t('shop.allTab')} ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'live'
              ? 'bg-[#2563eb] text-white shadow-glow-blue'
              : 'text-[#8d90a0] hover:text-white'
          }`}
        >
          {t('shop.liveTab')} ({liveCount})
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'drafts'
              ? 'bg-[#2563eb] text-white shadow-glow-blue'
              : 'text-[#8d90a0] hover:text-white'
          }`}
        >
          {t('shop.draftsTab')} ({draftCount})
        </button>
      </div>

      {/* 2-Column Product Grid */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        {filteredProducts.map((product) => {
          const isLive = product.status === 'live';
          return (
            <div
              key={product.id}
              className="bg-[#191c1e] rounded-xl p-2.5 border border-[#1E293B] shadow-sm flex flex-col justify-between hover:border-[#2563eb]/60 hover:shadow-glow-blue transition group"
            >
              <div className="space-y-2">
                {/* Image & Status Tag */}
                <div className="w-full aspect-square rounded-lg overflow-hidden relative bg-[#0c0f10] border border-[#1E293B]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow-sm border ${
                        isLive
                          ? 'bg-[#101415]/90 text-[#22C55E] border-[#22C55E]/40'
                          : 'bg-[#101415]/90 text-[#8d90a0] border-[#1E293B]'
                      }`}
                    >
                      {isLive ? t('shop.liveBadge') : t('shop.draftBadge')}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xs font-bold text-white leading-tight line-clamp-2">
                    {product.title}
                  </h3>
                  {product.teluguTitle && (
                    <p className="text-[10px] text-[#8d90a0] mt-0.5 line-clamp-1">
                      {product.teluguTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Price & Translate Action */}
              <div className="pt-2 mt-1.5 border-t border-[#1E293B] flex items-center justify-between font-mono">
                <span className="text-sm font-bold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTranslatingProduct(product);
                  }}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#2563eb]/20 hover:bg-[#2563eb] text-[#b4c5ff] hover:text-white transition text-[10px] font-bold border border-[#2563eb]/30"
                  title="Translate listing into 8 Indian languages"
                >
                  <Languages className="w-3 h-3" />
                  <span>{t('shop.translateBtn')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Translation Studio Modal */}
      <ProductTranslationModal
        isOpen={!!translatingProduct}
        onClose={() => setTranslatingProduct(null)}
        product={translatingProduct}
      />
    </div>
  );
};
