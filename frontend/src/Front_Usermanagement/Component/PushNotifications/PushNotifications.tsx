import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationProps {
  type: 'simple' | 'withLink' | 'withAction' | 'askPermission';
  message: string;
  link?: string; // Pour les notifications avec lien de redirection
  actionLabel?: string; // Label du bouton d'action
  onActionClick?: () => void; // Fonction à appeler lorsque le bouton est cliqué
}

const NotificationManager: React.FC = () => {
  return <ToastContainer />;
};

export const showNotification = ({
  type,
  message,
  link,
  actionLabel,
  onActionClick,
}: NotificationProps) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case 'simple':
      toast.info(message, options);
      break;
    case 'withLink':
      toast.info(
        <div>
          <p>{message}</p>
          {link && (
            <a href={link} style={{ color: '#4CAF50' }} target="_blank" rel="noopener noreferrer">
              Cliquez ici pour en savoir plus
            </a>
          )}
        </div>,
        options
      );
      break;
    case 'withAction':
      toast.info(
        <div>
          <p>{message}</p>
          {actionLabel && (
            <button onClick={onActionClick} style={{ marginTop: '10px', color: '#4CAF50', cursor: 'pointer' }}>
              {actionLabel}
            </button>
          )}
        </div>,
        options
      );
      break;
    case 'askPermission':
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          toast.success('Notifications autorisées', options);
        } else {
          toast.error('Notifications refusées', options);
        }
      });
      break;
    default:
      toast.info(message, options);
  }
};

export default NotificationManager;
