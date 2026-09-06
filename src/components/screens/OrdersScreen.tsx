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
    <div className="flex-1 flex flex-col p-4 bg-[#101415] text-[#e0e3e5] overflow-y-auto select-none space-y-4">
      {/* Top Header */}
      <div className="pt-1">
        <h1 className="text-xl font-bold text-white tracking-tight font-mono">
          {t('orders.title')}
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#191c1e] rounded-xl border border-[#1E293B] shadow-sm overflow-x-auto scrollbar-none font-mono">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${
            activeTab === 'new'
              ? 'bg-[#2563eb] text-white shadow-glow-blue'
              : 'text-[#8d90a0] hover:text-white'
          }`}
        >
          {t('orders.newTab')} ({newOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('packed')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${
            activeTab === 'packed'
              ? 'bg-[#2563eb] text-white shadow-glow-blue'
              : 'text-[#8d90a0] hover:text-white'
          }`}
        >
          {t('orders.packedTab')} ({packedOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('shipped')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${
            activeTab === 'shipped'
              ? 'bg-[#2563eb] text-white shadow-glow-blue'
              : 'text-[#8d90a0] hover:text-white'
          }`}
        >
          {t('orders.shippedTab')} ({shippedOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('delivered')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition ${
            activeTab === 'delivered'
              ? 'bg-[#2563eb] text-white shadow-glow-blue'
              : 'text-[#8d90a0] hover:text-white'
          }`}
        >
          {t('orders.deliveredTab')} ({deliveredOrders.length})
        </button>
      </div>

      {/* Section: New Orders (Ready to Pack) */}
      <div className="space-y-2.5 font-mono">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-[#8d90a0] uppercase tracking-wider">
            {t('orders.newTab')} ({newOrders.length} Pending)
          </h2>
          <span className="text-[10px] text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.5 rounded border border-[#2563eb]/30">
            {newOrders.length} Pending
          </span>
        </div>

        <div className="space-y-2.5">
          {newOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm space-y-2 hover:border-[#2563eb]/60 transition"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#b4c5ff]" />
                    <h3 className="text-sm font-bold text-white">{order.city}</h3>
                  </div>
                  <p className="text-[11px] text-[#8d90a0]">{order.itemTitle}</p>
                </div>
                <span className="text-base font-bold text-white">₹{order.amount}</span>
              </div>

              <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-medium text-[#FACC15] bg-[#FACC15]/15 px-2 py-0.5 rounded-md border border-[#FACC15]/30">
                  <Clock className="w-3 h-3" />
                  <span>Awaiting Packing</span>
                </div>

                <button
                  onClick={() => onPackOrder && onPackOrder(order.id)}
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg shadow-glow-blue transition flex items-center gap-1 active:scale-95 border border-[#b4c5ff]/30"
                >
                  <Box className="w-3 h-3" />
                  <span>{t('orders.packButton')}</span>
                </button>
              </div>
            </div>
          ))}

          {newOrders.length === 0 && (
            <div className="bg-[#191c1e] p-6 rounded-xl border border-[#1E293B] text-center text-xs text-[#8d90a0]">
              {t('orders.emptyNew')}
            </div>
          )}
        </div>
      </div>

      {/* Section: Recent Deliveries */}
      <div className="space-y-2.5 pt-1 font-mono">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-[#8d90a0] uppercase tracking-wider">
            {t('orders.deliveredTab')}
          </h2>
          <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/15 px-2 py-0.5 rounded border border-[#22C55E]/30">
            Fulfilled
          </span>
        </div>

        <div className="space-y-2.5">
          {deliveredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                  <h3 className="text-sm font-bold text-white">{order.city}</h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-[#22C55E]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Delivered</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-bold text-white">₹{order.amount}</span>
                <span className="text-[10px] text-[#8d90a0] block">{order.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
