// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Stack,
  Box
} from '@mui/material';

// assets
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const ConfirmationDialog = ({
  isDialogOpen,
  onCancel,
  title,
  Content,
  confirmHandle,
  color = 'error',
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      maxWidth='xs'
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          color: '#fff',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)'
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              bgcolor: 'rgba(255, 77, 79, 0.2)',
              p: 1,
              borderRadius: '10px',
              display: 'flex',
              color: '#ff4d4f'
            }}
          >
            <WarningAmberRoundedIcon />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Stack>
        <IconButton
          aria-label='close'
          onClick={onCancel}
          sx={{
            position: 'absolute',
            right: 16,
            top: 20,
            color: 'rgba(255, 255, 255, 0.5)',
            '&:hover': { color: '#fff', bgcolor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', lineHeight: 1.6 }}>
          {Content}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ width: '100%' }}>
          <Button
            onClick={onCancel}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255, 255, 255, 0.05)' }
            }}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={confirmHandle}
            sx={{
              bgcolor: '#ff4d4f',
              '&:hover': { bgcolor: '#ff7875' },
              borderRadius: '10px',
              fontWeight: 700,
              px: 3,
              textTransform: 'none',
              boxShadow: '0 4px 14px 0 rgba(255, 77, 79, 0.39)'
            }}
          >
            Confirm Delete
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

