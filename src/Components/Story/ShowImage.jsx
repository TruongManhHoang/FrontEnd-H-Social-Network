import { Box, Modal } from '@mui/material';
import React from 'react';

const ShowImage = ({ open, handleClose, item }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxWidth: '80vw',
    maxHeight: '80vh',
    bgcolor: 'rgba(0, 0, 0, 0.8)', // Đổi màu nền thành nửa trong suốt
    border: 'none',
    boxShadow: 24,
    p: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none', // Loại bỏ viền mặc định của modal
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '10px', // Bo tròn góc của ảnh
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Thêm hiệu ứng đổ bóng
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button
            style={closeButtonStyle}
            onClick={handleClose}
          >
            &times;
          </button>
          <img
            src={item.image}
            alt="Story"
            style={imageStyle}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ShowImage;
