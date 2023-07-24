import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../assets';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string
};

export default function AppWelcome({ displayName }) {
  const quotes = [
    {
      text: 'Genius is one percent inspiration and ninety-nine percent perspiration.',
      author: 'Thomas Edison'
    },
    {
      text: 'Alone we can do so little; together we can do so much.',
      author: 'Helen Keller'
    },
    {
      text: 'Talent wins games, but teamwork and intelligence win championships.',
      author: 'Michael Jordan'
    },
    {
      text: 'Teamwork begins by building trust. And the only way to do that is to overcome our need for invulnerability.',
      author: 'Patrick Lencioni'
    },
    {
      text: 'It is literally true that you can succeed best and quickest by helping others to succeed.',
      author: 'Napolean Hill'
    },
    {
      text: 'If you want to lift yourself up, lift up someone else.',
      author: 'Booker T. Washington'
    },
    {
      text: 'None of us, including me, ever do great things. But we can all do small things, with great love, and together we can do something wonderful.',
      author: 'Mother Teresa'
    },
    {
      text: 'Coming together is a beginning, staying together is progress, and working together is success.',
      author: 'Henry Ford'
    },
    {
      text: 'The best teamwork comes from men who are working independently toward one goal in unison.',
      author: 'James Cash Penney'
    }
  ];

  const { text, author } = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <RootStyle>
      <CardContent
        sx={{
          m: 2,
          p: { md: 0 },
          pl: { md: 5 },
          color: '#FFFFFF',
          width: '5500%'
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: '#000000' }}>
          Hi,
          <br />
          Welcome Admin
          {/* {!displayName ? '...' : displayName}! */}
        </Typography>
        <div>
          <Typography
            component="p"
            sx={{
              alignItems: 'flex-start',
              textAlign: 'left',
              width: '120%'
            }}
            color="#000000"
          >
            Don't spend many time to manage your invoice. Instead, let us take care of
            <br />
            the leg work so You can spend your time on what really matters....
          </Typography>
        </div>

        <h1
          className="header-title"
          style={{
            textAlign: 'left',
            marginLeft: '-1em',
            marginTop: '1em',
            color: '#7635dc'
          }}
        >
          CASH MANAGEMENT SOLUTIONS & SYSTEMS FOR YOUR BANK
        </h1>

        {/* <Typography variant="body1" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {text}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
          - {author}
        </Typography> */}

        {/* <Button variant="contained" to={PATH_DASHBOARD.timesheet.timesheet} component={RouterLink}>
          Go to timesheet
        </Button> */}
      </CardContent>
      {/* 
      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      /> */}
    </RootStyle>
  );
}
