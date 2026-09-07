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
    <div className="flex-1 flex flex-col p-4 bg-artisan-bg text-artisan-text overflow-y-auto select-none space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-xl font-extrabold text-artisan-text tracking-tight">
          {t('shop.title')}
        </h1>
        <button
          onClick={onAddNew}
          className="bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold py-2 px-3.5 rounded-full shadow-craft transition flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>{t('shop.addNew')}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-artisan-border shadow-soft">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'all'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
          }`}
        >
          {t('shop.allTab')} ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'live'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
          }`}
        >
          {t('shop.liveTab')} ({liveCount})
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'drafts'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
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
              className="bg-white rounded-2xl p-2.5 border border-artisan-border shadow-soft flex flex-col justify-between hover:border-terracotta/40 transition group"
            >
              <div className="space-y-2">
                {/* Image & Status Tag */}
                <div className="w-full aspect-square rounded-xl overflow-hidden relative bg-neutral-100 border border-neutral-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm ${
                        isLive
                          ? 'bg-forest-light text-forest border border-forest/30'
                          : 'bg-neutral-100 text-neutral-600 border border-neutral-300'
                      }`}
                    >
                      {isLive ? t('shop.liveBadge') : t('shop.draftBadge')}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xs font-bold text-artisan-text leading-tight line-clamp-2">
                    {product.title}
                  </h3>
                  {product.teluguTitle && (
                    <p className="text-[10px] text-artisan-muted mt-0.5 line-clamp-1">
                      {product.teluguTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Price & Translate Action */}
              <div className="pt-2 mt-1.5 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-sm font-black text-artisan-text">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTranslatingProduct(product);
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white transition text-[10px] font-bold border border-terracotta/20"
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
