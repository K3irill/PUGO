import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

const rewards = [5000, 10000, 15000, 20000, 30000, 40000, 50000];

interface DailyAwardsProps {
  day: number; 
}

const DailyAwards: React.FC<DailyAwardsProps> = ({ day }) => {
  const [open, setOpen] = useState(true);
	const { t, i18n } = useTranslation('common')

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #1a0033 0%, #2d0066 100%)',
          borderRadius: 4,
          boxShadow: '0 0 40px 10px #7f00ff55',
        },
      }}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle align="center" sx={{ color: '#fff', letterSpacing: 2, fontWeight: 700 }}>
   
        {t('content.dailyAwards.title')}
      </DialogTitle>
      <DialogContent sx={{padding: '20px 4px'}}>
        <Typography align="center" sx={{ mb: 2, color: '#e0c3fc' }}>
          {t('content.dailyAwards.description')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '4px',
            alignItems: 'stretch',
            margin: '0 auto',
            maxWidth: 600,
            padding: 0,
            py: 0,
          }}
        >
     
          {[0, 1, 2].map((idx) => {
            const isCurrent = day === idx + 1;
            const isReceived = day > idx + 1;
            return (
              <div key={idx} style={{ gridColumn: idx + 1, gridRow: 1 }}>
                <Card
                  sx={{
                    border: isCurrent ? '2px solid #00ffe7' : '1px solid #7f00ff',
                    boxShadow: isCurrent ? '0 0 16px 4px #00ffe7' : '0 0 8px 2px #7f00ff55',
                    background: isReceived
                      ? 'linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)'
                      : isCurrent
                      ? 'linear-gradient(135deg, #00ffe7 0%, #7f00ff 100%)'
                      : 'linear-gradient(135deg, #2d0066 0%, #1a0033 100%)',
                    color: '#fff',
                    position: 'relative',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#b39ddb' }}>
                      {t('content.dailyAwards.day', { day: idx + 1, defaultValue: 'День {{day}}' })}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, mb: 1, color: '#fff' }}>
                      <StarIcon sx={{ color: '#FFD700', verticalAlign: 'middle', mr: 0.5 }} />
                      {rewards[idx].toLocaleString()}
                    </Typography>
                    {isCurrent && (
                      <Typography variant="body2" sx={{ color: '#00ffe7' }}>
                        {t('content.dailyAwards.today')}
                      </Typography>
                    )}
                    {isReceived && (
                      <CheckCircleIcon sx={{ color: '#00ffe7', position: 'absolute', top: 8, right: 8 }} />
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
 
          {[3, 4, 5].map((idx, i) => {
            const isCurrent = day === idx + 1;
            const isReceived = day > idx + 1;
            return (
              <div key={idx} style={{ gridColumn: i + 1, gridRow: 2 }}>
                <Card
                  sx={{
                    border: isCurrent ? '2px solid #00ffe7' : '1px solid #7f00ff',
                    boxShadow: isCurrent ? '0 0 16px 4px #00ffe7' : '0 0 8px 2px #7f00ff55',
                    background: isReceived
                      ? 'linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)'
                      : isCurrent
                      ? 'linear-gradient(135deg, #00ffe7 0%, #7f00ff 100%)'
                      : 'linear-gradient(135deg, #2d0066 0%, #1a0033 100%)',
                    color: '#fff',
                    position: 'relative',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#b39ddb' }}>
                      {t('content.dailyAwards.day', { day: idx + 1, defaultValue: 'День {{day}}' })}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, mb: 1, color: '#fff' }}>
                      <StarIcon sx={{ color: '#FFD700', verticalAlign: 'middle', mr: 0.5 }} />
                      {rewards[idx].toLocaleString()}
                    </Typography>
                    {isCurrent && (
                      <Typography variant="body2" sx={{ color: '#00ffe7' }}>
                        {t('content.dailyAwards.today')}
                      </Typography>
                    )}
                    {isReceived && (
                      <CheckCircleIcon sx={{ color: '#00ffe7', position: 'absolute', top: 8, right: 8 }} />
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
     
          <div style={{ gridColumn: '1 / span 3', gridRow: 3 }}>
            <Card
              sx={{
                height: '100%',
                minHeight: 120,
                border: day === 7 ? '2px solid #ff00c8' : '1px solid #00ffe7',
                boxShadow: day === 7 ? '0 0 32px 8px #ff00c8' : '0 0 16px 4px #00ffe755',
                background: day > 7
                  ? 'linear-gradient(135deg, #ff00c8 0%, #7f00ff 100%)'
                  : day === 7
                  ? 'linear-gradient(135deg, #ff00c8 0%, #00ffe7 100%)'
                  : 'linear-gradient(135deg, #2d0066 0%, #1a0033 100%)',
                color: '#fff',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="subtitle2" sx={{ color: '#ffb3e6' }}>
                  {t('content.dailyAwards.day', { day: 7, defaultValue: 'День {{day}}' })}
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, mb: 1, color: '#fff', fontWeight: 700 }}>
                  <StarIcon sx={{ color: '#FFD700', verticalAlign: 'middle', mr: 0.5, fontSize: 32 }} />
                  {rewards[6].toLocaleString()}
                </Typography>
                {day === 7 && (
                  <Typography variant="body1" sx={{ color: '#ff00c8', fontWeight: 700 }}>
                    {t('content.dailyAwards.today')}
                  </Typography>
                )}
                {day > 7 && (
                  <CheckCircleIcon sx={{ color: '#ff00c8', position: 'absolute', top: 8, right: 8, fontSize: 32 }} />
                )}
              </CardContent>
            </Card>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" sx={{ background: 'linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)', color: '#fff', fontWeight: 700 }} fullWidth>
          {t('content.dailyAwards.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DailyAwards; 