import React, { useState } from 'react';
import { X, Cpu, MemoryStick, HardDrive, Monitor, Smartphone, Terminal, Video } from 'lucide-react';

const RequirementsModal = () => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  const Section = ({ title, requirements }) => (
    <div style={{
      backgroundColor: 'rgba(249, 250, 251, 0.8)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
    }}>
      <h3 style={{
        fontSize: '1.25rem',
        color: '#1F2937',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        {title === 'Для компьютера (PC/Mac)' ? <Monitor size={24} /> : <Smartphone size={24} />}
        {title}
      </h3>
      {requirements.map((req, index) => (
        <div key={index} style={{
          marginBottom: '16px',
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h4 style={{
            fontSize: '1rem',
            color: '#4B5563',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            {req.title}
          </h4>
          <div style={{
            display: 'grid',
            gap: '8px'
          }}>
            {req.specs.map((spec, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(249, 250, 251, 0.5)'
              }}>
                {getIcon(spec.type)}
                <span style={{ color: '#4B5563' }}>{spec.label}: </span>
                <span style={{ color: '#1F2937', fontWeight: '500' }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const getIcon = (type) => {
    switch (type) {
      case 'cpu':
        return <Cpu size={16} />;
      case 'ram':
        return <MemoryStick size={16} />;
      case 'storage':
         return <HardDrive size={16} />;
      case 'os':
            return <Terminal size={16} />;
    case 'gpu':
        return <Video size={16} />;
      default:
        return null;
    }
  };

  const requirements = {
    pc: [
      {
        title: 'Минимальные требования',
        specs: [
          { type: 'cpu', label: 'Процессор', value: 'Intel Core i5 / AMD Ryzen 5' },
          { type: 'ram', label: 'RAM', value: '8 GB' },
          { type: 'gpu', label: 'Видеокарта', value: 'Встроенная графика' },
          { type: 'os', label: 'ОС', value: 'Windows 10, macOS 10.14+' },
          { type: 'storage', label: 'Хранение', value: '256 GB SSD' },
        ]
      },
      {
        title: 'Рекомендуемые требования',
        specs: [
          { type: 'cpu', label: 'Процессор', value: 'Intel Core i7 / AMD Ryzen 7' },
          { type: 'ram', label: 'RAM', value: '16 GB' },
          { type: 'gpu', label: 'Видеокарта', value: 'NVIDIA GTX 1650 / AMD RX 570' },
          { type: 'os', label: 'ОС', value: 'Windows 10, macOS 11+' },
          { type: 'storage', label: 'Хранение', value: '512 GB SSD или больше' },
        ]
      }
    ],
    mobile: [
      {
        title: 'Минимальные требования',
        specs: [
          { type: 'cpu', label: 'Процессор', value: 'Snapdragon 600 series' },
          { type: 'ram', label: 'RAM', value: '4 GB' },
          { type: 'gpu', label: 'GPU', value: 'Встроенная графика' },
          { type: 'os', label: 'ОС', value: 'Android 9.0 / iOS 13+' },
          { type: 'storage', label: 'Хранение', value: '64 GB' },
        ]
      },
      {
        title: 'Рекомендуемые требования',
        specs: [
          { type: 'cpu', label: 'Процессор', value: 'Snapdragon 800 series / A13 Bionic' },
          { type: 'ram', label: 'RAM', value: '6 GB' },
          { type: 'gpu', label: 'GPU', value: 'Adreno 640 / Mali-G76' },
          { type: 'os', label: 'ОС', value: 'Android 10+ / iOS 14+' },
          { type: 'storage', label: 'Хранение', value: '128 GB и более' },
        ]
      }
    ]
  };

  return showModal ? (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          padding: '24px',
          borderBottom: '1px solid #E5E7EB',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>
            Требования для обработки видео
          </h2>
          <button
            onClick={closeModal}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#F3F4F6'
              }
            }}
          >
            <X size={24} color="#6B7280" />
          </button>
        </div>

        <div style={{
          padding: '24px',
        }}>
          <p style={{
            fontSize: '1rem',
            color: '#4B5563',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}>
            Для комфортной работы с видео, пожалуйста, убедитесь, что ваше устройство соответствует минимальным требованиям:
          </p>

          <Section title="Для компьютера (PC/Mac)" requirements={requirements.pc} />
          <Section title="Для мобильных телефонов" requirements={requirements.mobile} />

          <div style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: '#4F46E5',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: '#4338CA'
                }
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default RequirementsModal;