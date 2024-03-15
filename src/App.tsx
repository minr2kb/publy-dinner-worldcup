import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import TalkingAnt from './components/TalkingAnt';
import useMediaQueries from './hooks/useMediaQueries';
import { FontWeightValues } from './utils/fontTypes';

function App() {
  const { isTablet: isNotDesktop } = useMediaQueries();

  if (isNotDesktop) {
    return (
      <>
        <TalkingAnt text={'개발자가 게을러서\n모바일은 없답니다'} />
        <Typography
          variant={'h5'}
          fontWeight={FontWeightValues.BOLD}
          textAlign={'center'}
          width={'100vw'}
        >
          {'데스크탑을 이용해주세요'}
        </Typography>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
