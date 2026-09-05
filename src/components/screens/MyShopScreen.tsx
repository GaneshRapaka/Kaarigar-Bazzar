import React, { useState } from 'react';
import { Plus, Sparkles, Filter, CheckCircle2, PauseCircle, ChevronRight } from 'lucide-react';
import { ProductItem } from '../../types';

interface MyShopScreenProps {
  products: ProductItem[];
  onAddNew: () => void;
  onSelectProduct?: (product: ProductItem) => void;
}

export const MyShopScreen: React.FC<MyShopScreenProps> = ({
  products,
  onAddNew,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'drafts'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'live') return p.status === 'live';
    if (activeTab === 'drafts') return p.status === 'draft' || p.status === 'paused';
    return true;
  });

  const liveCount = products.filter((p) => p.status === 'live').length;
  const draftCount = products.filter((p) => p.status === 'draft' || p.status === 'paused').length;

  return (
    <div className="flex-1 flex flex-col p-4 bg-artisan-bg overflow-y-auto select-none space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-xl font-extrabold text-artisan-text tracking-tight">My Shop</h1>
        <button
          onClick={onAddNew}
          className="bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold py-2 px-3.5 rounded-full shadow-craft transition flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Add New</span>
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
          All Items ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'live'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
          }`}
        >
          Live ({liveCount})
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'drafts'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
          }`}
        >
          Drafts ({draftCount})
        </button>
      </div>

      {/* 2-Column Product Grid */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        {filteredProducts.map((product) => {
          const isLive = product.status === 'live';
          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct && onSelectProduct(product)}
              className="bg-white rounded-2xl p-2.5 border border-artisan-border shadow-soft flex flex-col justify-between hover:border-terracotta/40 transition group cursor-pointer"
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
                      {isLive ? 'Live' : 'Paused'}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-xs font-bold text-artisan-text leading-tight line-clamp-2">
                    {product.title}
                  </h3>
                  {product.teluguTitle && (
                    <p className="text-[10px] text-artisan-muted font-telugu mt-0.5 line-clamp-1">
                      {product.teluguTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-2 mt-1 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-sm font-black text-artisan-text">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-semibold text-terracotta group-hover:translate-x-0.5 transition-transform">
                  View →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
