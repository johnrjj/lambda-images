import * as React from 'react';
import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const PageWrapper = styled.div``;

const BlueGradient = styled.div`
  background-image: linear-gradient(-180deg, #5483F7 19%, #2B5BDB 100%);
  height: 700px;
  position: relative;
`;

const WhiteGradient = styled.div`
height: 100vh;
background-image: linear-gradient(-180deg, #FEFEFF 0%, #FCFCFD 51%, #F3F7FF 100%);
`;

const Overlay = styled.section`
margin: 0 auto;
margin-top: 140px;
height: 662px;
width: 660px;
background: #FFFFFF;
box-shadow: 0 0 74px 28px rgba(0,0,0,0.15);
border-radius: 14px;
z-index: 1;
top: 0;
left: 0;
bottom: 0;
right: 0;
position: absolute;
`;

const CallToAction = styled.header`
margin: 46px auto 36px auto;
color: #74809D;
width: 376px;
font-size: 36px;
text-align: center;
`;

const DropZone = styled.div`
  height: 452px;
  border: 1px dashed #B9B5B5;
  border-radius: 16px;
  margin: 0 41px 30px 41px;
  padding: 54px 109px;
`;

const InstructionMain = styled.div`
  font-size: 36px;
  font-weight: 300;
  color: #4F4040;
  letter-spacing: 0;
  text-align: center;
`;

const Browse = styled.a`
  text-decoration: underline;
`;

const InstructionSecondary = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #4F4040;
  letter-spacing: 0;
  text-align: center;
`;


const PhotosSvg = styled((props: any) => (
<svg className={props.className} width="90px" height="78px" viewBox="130 146 90 78" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="pictures" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(130.000000, 146.000000)">
        <g id="Layer_1" fill-rule="nonzero">
            <path d="M2.94678571,18.3136164 L70.815,0.218150685 C72.9248214,-0.342986301 75.1753571,0.919438356 75.7380357,3.02365753 L89.1710714,52.7507945 C89.73375,54.8548356 88.4678571,57.0292192 86.2875,57.5901781 L18.4194643,75.6856438 C16.3096429,76.2467808 14.0591071,74.9843562 13.4964286,72.880137 L0.13375,23.153 C-0.428928571,21.0489589 0.836964286,18.8747534 2.94678571,18.3136164 Z" id="Shape" fill="#E4E7E7"></path>
            <path d="M8.64357143,22.3113836 L68.0017857,6.53063014 C69.6192857,6.10982192 71.3073214,7.09176712 71.7996429,8.70483562 L82.9117857,49.8753014 C83.33375,51.4883699 82.3491071,53.1717808 80.7316071,53.592589 L21.3732143,69.3733425 C19.7557143,69.7941507 18.0676786,68.8122055 17.5753571,67.199137 L6.46339286,26.0286712 C5.97107143,24.4154247 6.95571429,22.7321918 8.64357143,22.3113836 Z" id="Shape" fill="#208DB2"></path>
            <path d="M15.2544643,17.6121507 L85.9357143,17.6121507 C88.18625,17.6121507 89.9444643,19.4357123 89.9444643,21.6099178 L89.9444643,73.8619041 C89.9444643,76.106274 88.1158929,77.8596712 85.9357143,77.8596712 L15.2544643,77.8596712 C13.0039286,77.8596712 11.2457143,76.0361096 11.2457143,73.8619041 L11.2457143,21.6100959 C11.2457143,19.4357123 13.0742857,17.6121507 15.2544643,17.6121507 Z" id="Shape" fill="#F3F3F3"></path>
            <path d="M19.9666071,23.2231644 L81.3644643,23.2231644 C83.0523214,23.2231644 84.4589286,24.6259178 84.4589286,26.3091507 L84.4589286,69.2330137 C84.4589286,70.9162466 83.0523214,72.319 81.3644643,72.319 L19.9666071,72.319 C18.27875,72.319 16.8721429,70.9162466 16.8721429,69.2330137 L16.8721429,26.3091507 C16.8721429,24.6259178 18.2083929,23.2231644 19.9666071,23.2231644 Z" id="Shape" fill="#A3E0F5"></path>
            <path d="M16.8721429,26.3091507 L16.8721429,41.3184521 C17.5753571,41.3886164 18.27875,41.4587808 18.9819643,41.4587808 C27.91375,41.4587808 35.1578571,34.2346986 35.1578571,25.3272055 C35.1578571,24.6259178 35.0875,23.9244521 35.0171429,23.2231644 L19.9666071,23.2231644 C18.2083929,23.2231644 16.8721429,24.6259178 16.8721429,26.3091507 Z" id="Shape" fill="#EFC75E"></path>
            <path d="M22.00625,57.5903562 C20.2480357,57.5903562 18.4898214,57.7306849 16.8721429,57.941 L16.8721429,69.2330137 C16.8721429,70.9162466 18.27875,72.319 19.9666071,72.319 L43.3864286,72.319 C43.5271429,71.6876986 43.5975,71.1267397 43.5975,70.4954384 C43.5973214,63.3415205 33.9623214,57.5903562 22.00625,57.5903562 Z" id="Shape" fill="#3DB39E"></path>
            <path d="M71.0258929,51.2778767 C51.7555357,51.2778767 36.0719643,60.6761644 35.8610714,72.319 L81.2941071,72.319 C82.9819643,72.319 84.3885714,70.9162466 84.3885714,69.2330137 L84.3885714,52.8911233 C80.2391071,51.9091781 75.7380357,51.2778767 71.0258929,51.2778767 Z" id="Shape" fill="#4BC2AD"></path>
        </g>
    </g>
</svg>
)) `
display: block;
  margin: 0 auto 38px auto;
`;

const CloudSvg = styled((props: any) => (
    <svg className={props.className} width="154px" height="131px" viewBox="98 0 154 131" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs></defs>
      <g id="cloud-computing" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(98.000000, 0.000000)">
        <g id="Capa_1" fill-rule="nonzero" fill="#B9B5B5">
          <g id="Group">
            <path d="M130.835833,41.6981154 C129.4832,18.6788846 110.4411,0.278846154 87.4822667,0.278846154 C73.5452667,0.278846154 60.0497333,7.08998077 51.6875333,18.2031538 C51.4976,18.1034038 51.2948333,18.0369038 51.1023333,17.9422692 C50.5941333,17.6967308 50.0782333,17.4614231 49.5495,17.25425 C49.2543333,17.1391538 48.9591667,17.0342885 48.6614333,16.9294231 C48.1429667,16.7478269 47.6193667,16.58925 47.0829333,16.4434615 C46.7852,16.3641731 46.4900333,16.2823269 46.1871667,16.2132692 C45.6122333,16.0828269 45.0270333,15.9830769 44.4341333,15.8961154 C44.1723333,15.85775 43.9156667,15.8065962 43.6513,15.7759038 C42.8043,15.6838269 41.9419,15.625 41.0666667,15.625 C28.3308667,15.625 17.9666667,25.9504038 17.9666667,38.6442308 C17.9666667,38.9741731 17.9846333,39.2964423 18.0077333,39.6187115 C7.33296667,45.417 0,57.5685962 0,69.7304231 C0,87.8465577 14.7891333,102.586538 32.9688333,102.586538 L46.2,102.586538 C47.6168,102.586538 48.7666667,101.44325 48.7666667,100.028846 C48.7666667,98.6144423 47.6168,97.4711538 46.2,97.4711538 L32.9688333,97.4711538 C17.6201667,97.4711538 5.13333333,85.0279808 5.13333333,69.7304231 C5.13333333,59.1057692 12.0761667,48.077 21.6421333,43.5064038 L23.1,42.8132692 L23.1,41.2019231 C23.1,40.8873269 23.1205333,40.5650577 23.1385,40.2427885 L23.1616,39.7951923 L23.1308,39.3143462 C23.1179667,39.0918269 23.1,38.8693077 23.1,38.6442308 C23.1,28.7740962 31.1593333,20.7403846 41.0666667,20.7403846 C41.8597667,20.7403846 42.6426,20.8094423 43.4203,20.91175 C43.6205,20.9373269 43.8181333,20.9705769 44.0157667,21.0038269 C44.7036333,21.1163654 45.3812333,21.2647115 46.0485667,21.4565385 C46.1358333,21.4821154 46.2256667,21.4974615 46.3103667,21.5230385 C47.0444333,21.7455577 47.7605333,22.0294615 48.4612333,22.3466154 C48.6383333,22.4259038 48.8128667,22.5128654 48.9874,22.5998269 C49.6085333,22.9041923 50.2168333,23.2418077 50.8020333,23.6203462 C55.748,26.8149038 59.0333333,32.34975 59.0333333,38.6442308 C59.0333333,40.0586346 60.1832,41.2019231 61.6,41.2019231 C63.0168,41.2019231 64.1666667,40.0586346 64.1666667,38.6442308 C64.1666667,31.6003462 60.9686,25.2956346 55.9533333,21.0703269 C63.3094,11.4789808 75.4292,5.39423077 87.4822667,5.39423077 C107.358533,5.39423077 123.872467,21.0856731 125.592133,40.9129038 C122.969,40.72875 119.039433,40.6341154 115.112433,41.2326154 C113.711033,41.4449038 112.748533,42.7493269 112.961567,44.1458269 C113.154067,45.4118846 114.247467,46.3198654 115.494867,46.3198654 C115.6232,46.3198654 115.7541,46.3096346 115.885,46.2891731 C121.593267,45.4297885 127.545367,46.2354615 127.907267,46.2840577 C139.857667,48.5476154 148.866667,59.5175577 148.866667,71.8226154 C148.866667,85.9640962 137.319233,97.4711538 123.128133,97.4711538 L112.933333,97.4711538 C111.516533,97.4711538 110.366667,98.6144423 110.366667,100.028846 C110.366667,101.44325 111.516533,102.586538 112.933333,102.586538 L123.128133,102.586538 C140.150267,102.586538 154,88.7852308 154,71.8226154 C154,57.7834423 144.177367,45.1919231 130.835833,41.6981154 Z" id="Shape"></path>
            <path d="M81.3838667,67.5308077 C81.1477333,67.2929423 80.8628333,67.1062308 80.5471333,66.9757885 C79.9208667,66.7174615 79.2124667,66.7174615 78.5862,66.9757885 C78.2705,67.1062308 77.9881667,67.2929423 77.7494667,67.5308077 L57.2187,87.9897885 C56.2151333,88.9898462 56.2151333,90.6063077 57.2187,91.6063654 C57.7192,92.1051154 58.3762667,92.3557692 59.0333333,92.3557692 C59.6904,92.3557692 60.3474667,92.1051154 60.8479667,91.6063654 L77,75.5108077 L77,128.163462 C77,129.577865 78.1498667,130.721154 79.5666667,130.721154 C80.9834667,130.721154 82.1333333,129.577865 82.1333333,128.163462 L82.1333333,75.5108077 L98.2853667,91.6063654 C98.7858667,92.1051154 99.4429333,92.3557692 100.1,92.3557692 C100.757067,92.3557692 101.414133,92.1051154 101.914633,91.6063654 C102.9182,90.6063077 102.9182,88.9898462 101.914633,87.9897885 L81.3838667,67.5308077 Z" id="Shape"></path>
          </g>
        </g>
      </g>
    </svg>
)) `
  display: block;
  margin: 0 auto 15px auto;
`;


const Home = ({ }) => (

  <div>
    <WhiteGradient>
      <BlueGradient>
      </BlueGradient>
    </WhiteGradient>
    <Overlay>
      <CallToAction>
        Instantly create a shareable photo album
        </CallToAction>
      <DropZone>
        <CloudSvg />
        <PhotosSvg />
        <InstructionMain>
          Drag & drop
        </InstructionMain>
        <InstructionSecondary>
          or <Browse href="#">browse</Browse> to upload your photos
        </InstructionSecondary>
      </DropZone>
    </Overlay>
  </div>

);



/*const Button = props =>
  <button
    onClick={props.onClick}
    className="f6 input-reset br2 bn ph3 pv2 mb2 dib bg-black white outline-0 ttu tracked"
  >
    { props.children }
  </button>;*/

// Button.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   children: PropTypes.string.isRequired,
// };

/*const Instance = props =>
  <div className={`sans-serif ${'stopped' == 'stopped' ? 'mid-gray' : 'bg-light-green dark-green'} flex items-center lh-copy pa3 ph0-l bb b--black-10`}>
    <div className="pl3 flex-auto">
      <span className="b f4 db">
        { 1234 }
      </span>
      <span className="f6 db">
        { 'meowmeow' } { `$$/h` }
      </span>
      <span className="f6 db">
        { 'i said what what'}
      </span>
    </div>
    <div>
      <Button onClick={() => { console.log('meow')}}>
        { props.State }
      </Button>
    </div>
  </div>;*/

// Instance.propTypes = InstanceS;

// export default Instance;

export default Home;
