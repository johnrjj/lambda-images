import * as React from 'react';

const Home = ({  }) => (
  <div>
    <h3>Drag file(s) here.</h3>
    <Instance></Instance>
  </div>
  
);



const Button = props =>
  <button
    onClick={props.onClick}
    className="f6 input-reset br2 bn ph3 pv2 mb2 dib bg-black white outline-0 ttu tracked"
  >
    { props.children }
  </button>;

// Button.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   children: PropTypes.string.isRequired,
// };

const Instance = props =>
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
  </div>;

// Instance.propTypes = InstanceS;

// export default Instance;

export default Home;
