import { useContext, useEffect } from "react";
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiX, FiXCircle } from "react-icons/fi";
import { ToastContext } from "../../providers/ToastProvider";

const statusConfig = {
  success: {
    icon: FiCheckCircle,
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-500",
    text: "text-green-800 dark:text-green-200",
    iconColor: "text-green-500",
  },
  error: {
    icon: FiXCircle,
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-500",
    text: "text-red-800 dark:text-red-200",
    iconColor: "text-red-500",
  },
  info: {
    icon: FiInfo,
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-500",
    text: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: FiAlertTriangle,
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-500",
    text: "text-yellow-800 dark:text-yellow-200",
    iconColor: "text-yellow-500",
  },
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: {
    id: string;
    title: string;
    description?: string;
    status: keyof typeof statusConfig;
  };
  onClose: () => void;
}

const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const config = statusConfig[toast.status];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg ${config.bg} ${config.border} animate-slide-in`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
      <div className="flex-1 min-w-0">
        <p className={`font-medium ${config.text}`}>{toast.title}</p>
        {toast.description && (
          <p className={`text-sm mt-1 ${config.text} opacity-80`}>{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className={`flex-shrink-0 ${config.text} opacity-60 hover:opacity-100 transition-opacity`}
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
};
