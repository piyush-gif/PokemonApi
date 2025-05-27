// Popup.jsx
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from './popupSlice';

const Popup = () => {
  const dispatch = useDispatch();
  const { isOpen, data, status } = useSelector((state) => state.popup);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={() => dispatch(closePopup())}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && data && (
          <>
            <h2>{data.name}</h2>
            <img src={data.img} alt={data.name} />
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
            <p>Base XP: {data.base_experience}</p>
            <p>
              Type:{' '}
              {data.type.map((t) => (
                <span key={t} className={`type-${t}`}>
                  {t}
                </span>
              ))}
            </p>
            <button onClick={() => dispatch(closePopup())}>Close</button>
          </>
        )}
        {status === 'failed' && <p>Failed to load data</p>}
      </div>
    </div>
  );
};

export default Popup;
