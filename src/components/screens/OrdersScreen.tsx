import React, { useState } from 'react';
import { CheckCircle2, Clock, MapPin, Box } from 'lucide-react';
import { OrderItem } from '../../types';
import { useLanguage } from '../../services/i18n';

interface OrdersScreenProps {
  orders: OrderItem[];
  onPackOrder?: (orderId: string) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ orders, onPackOrder }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'new' | 'packed' | 'shipped' | 'delivered'>('new');

  const newOrders = orders.filter((o) => o.statusGroup === 'new');
  const packedOrders = orders.filter((o) => o.statusGroup === 'packed');
  const shippedOrders = orders.filter((o) => o.statusGroup === 'shipped');
  const deliveredOrders = orders.filter((o) => o.statusGroup === 'delivered');

  return (
    <div className="flex-1 flex flex-col p-4 bg-artisan-bg text-artisan-text overflow-y-auto select-none space-y-4">
      {/* Top Header */}
      <div className="pt-1">
        <h1 className="text-xl font-extrabold text-artisan-text tracking-tight">
          {t('orders.title')}
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white rounded-2xl border border-artisan-border shadow-soft overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
            activeTab === 'new'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
          }`}
        >
          {t('orders.newTab')} ({newOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('packed')}
          className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
            activeTab === 'packed'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
          }`}
        >
          {t('orders.packedTab')} ({packedOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('shipped')}
          className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
            activeTab === 'shipped'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
          }`}
        >
          {t('orders.shippedTab')} ({shippedOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('delivered')}
          className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
            activeTab === 'delivered'
              ? 'bg-terracotta text-white shadow-sm'
              : 'text-artisan-muted hover:text-artisan-text'
          }`}
        >
          {t('orders.deliveredTab')} ({deliveredOrders.length})
        </button>
      </div>

      {/* Section: New Orders (Ready to Pack) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-artisan-text uppercase tracking-wider">
            {t('orders.newTab')} ({newOrders.length} Pending)
          </h2>
          <span className="text-[10px] text-terracotta font-bold">
            {newOrders.length} Pending
          </span>
        </div>

        <div className="space-y-2.5">
          {newOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-3.5 border border-artisan-border shadow-soft space-y-2 hover:border-terracotta/40 transition"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-terracotta" />
                    <h3 className="text-sm font-bold text-artisan-text">{order.city}</h3>
                  </div>
                  <p className="text-[11px] text-artisan-muted">{order.itemTitle}</p>
                </div>
                <span className="text-base font-black text-artisan-text">₹{order.amount}</span>
              </div>

              <div className="pt-2 border-t border-artisan-border/70 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <Clock className="w-3 h-3" />
                  <span>Status: Awaiting Packing</span>
                </div>

                <button
                  onClick={() => onPackOrder && onPackOrder(order.id)}
                  className="bg-terracotta hover:bg-terracotta-hover text-white text-[11px] font-bold py-1 px-3 rounded-lg shadow-sm transition flex items-center gap-1"
                >
                  <Box className="w-3 h-3" />
                  <span>{t('orders.packButton')}</span>
                </button>
              </div>
            </div>
          ))}

          {newOrders.length === 0 && (
            <div className="bg-white p-6 rounded-2xl border border-artisan-border text-center text-xs text-artisan-muted shadow-soft">
              {t('orders.emptyNew')}
            </div>
          )}
        </div>
      </div>

      {/* Section: Recent Deliveries */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-artisan-text uppercase tracking-wider">
            {t('orders.deliveredTab')}
          </h2>
          <span className="text-[10px] text-forest font-bold">
            Fulfilled
          </span>
        </div>

        <div className="space-y-2.5">
          {deliveredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-3.5 border border-artisan-border shadow-soft flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-forest" />
                  <h3 className="text-sm font-bold text-artisan-text">{order.city}</h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-forest">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Status: Delivered</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-black text-artisan-text">₹{order.amount}</span>
                <span className="text-[10px] text-artisan-muted block">{order.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
