import { Children } from 'react'
import { motion } from 'framer-motion'
import { useStore } from './store'

const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: 'auto',
    transition: { when: 'beforeChildren', staggerChildren: 0.05 }
  }
}

const item = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: 0 }
}

function List({ children, open }) {
  return (
    <motion.ul variants={container} initial="hidden" animate={open ? 'show' : 'hidden'}>
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  )
}

const buttonVariants = {
  initial: {
    color: 'rgb(0, 0, 0)',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    border: '1px solid black',
    scale: 1,
  },
  hover: {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      backgroundColor: { delay: 0.1 },
    },
  },
};

export function Overlay() {

  const state = useStore()
  const { modelPath, open } = useStore();

  const toggleOverlay = () => {
    state.open = !state.open; // Toggle between true and false
  };
  const switchModel = (model) => {
    state.modelPath = `public/assets/${model}.glb`;
  };

  const switchToWhiteModel = () => {
    if (state.modelPath.includes('hoodie_black')) {
      state.modelPath = state.models.hoodieWhite; // Use preloaded white hoodie model
    } else if (state.modelPath.includes('sweater_black')) {
      state.modelPath = state.models.sweaterWhite; // Use preloaded white sweater model
    }
  };

  const switchToBlackModel = () => {
    if (state.modelPath.includes('hoodie_white')) {
      state.modelPath = state.models.hoodieBlack; // Use preloaded black hoodie model
    } else if (state.modelPath.includes('sweater_white')) {
      state.modelPath = state.models.sweaterBlack; // Use preloaded black sweater model
    }
  };

  let modelInfoText;
  if (modelPath.includes('hoodie_black')) {
    modelInfoText = "NY-001 BLACK";
  } else if (modelPath.includes('hoodie_white')) {
    modelInfoText = "NY-001 WHITE";
  } else if (modelPath.includes('sweater_black')) {
    modelInfoText = "TK-001 BLACK";
  } else if (modelPath.includes('sweater_white')) {
    modelInfoText = "TK-001 WHITE";
  }


  let modelInfoText01;
  if (modelPath.includes('hoodie')) {
    modelInfoText01 = "hoodie";
  } else if (modelPath.includes('sweater')) {
    modelInfoText01 = "sweatshirt";
  }

  let modelInfoText02;
  if (modelPath.includes('hoodie_black')) {
    modelInfoText02 = "This unique black hoodie captures the essence of New York City at night, blending solitude with the city's relentless energy. The design features a distorted, night-time image of the city, highlighting steam rising from sewage grates against the backdrop of a glaring streetlamp. It's a wearable piece of art that conveys the vibrant yet solitary vibe of urban nights, wrapped in a sense of the absurd.";
  } else if (modelPath.includes('hoodie_white')) {
    modelInfoText02 = "This striking white hoodie captures the daytime hustle of New York City through a vivid, real-life image of a subway entrance on a bustling street—mere stairs leading into the urban depths. It vividly represents the city's daylight essence: noisy, buzzing with the energy of the crowd, and alive with constant motion. The design embodies the vibrant chaos and dynamic spirit of New York under the sun, offering a wearable piece of art that celebrates the loud, lively side of urban life.";
  } else if (modelPath.includes('sweater_black')) {
    modelInfoText02 = "The black Tokyo sweatshirt offers a profound commentary on Japan's intense work culture through a striking design that marries bold maximalistic typography with minimalist geometric shapes. It features the phrase 'I am still alive' in Japanese, encapsulated within a harmonious blend of traditional Asian squares and circles. This design not only reflects the relentless work ethic but also incorporates elements of Asian aesthetic philosophy, making a powerful statement on resilience amidst adversity.";
  } else if (modelPath.includes('sweater_white')) {
    modelInfoText02 = "The white Tokyo sweatshirt carries the theme of perpetual toil with the word 'Monday' in Japanese, underscored by the nostalgic phrase 'to be continued' in the style of old-fashioned Japanese TV shows. Behind the text, black circles symbolize the earth and the sun, with a unique dripping pattern suggesting they are bleeding. This imagery serves as a stark visual metaphor for the relentless cycle of work and the overshadowing sense of fatigue, artfully blending traditional Japanese symbolism with a critique of modern work life.";
  }

  return (
    <>
      {/* social icons container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          bottom: 60,
          right: 40,
          display: 'flex',          // Use flexbox for horizontal layout
          alignItems: 'flex-end',
          justifyContent: 'space-between', // Distribute space between images
          width: '80px', // Adjust the width as necessary
        }}>
          <img src="public/assets/Social Icons1.png" alt="Image 1" style={{ width: 'auto', height: '20px' }} />
          <img src="public/assets/Social Icons2.png" alt="Image 2" style={{ width: 'auto', height: '20px' }} />
          <img src="public/assets/Social Icons3.png" alt="Image 3" style={{ width: 'auto', height: '20px' }} />
        </div>
      </div>

      {/* ABOUT */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}>
        <motion.button
          className="cusButton"
          onClick={toggleOverlay}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          {open ? "CLOSE" : "ABOUT"} {/* Change the label based on the open state */}
        </motion.button>
      </div>


      {/* sweater and hoodie */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '27%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        zIndex: 10
      }}>
        <motion.div
          style={{
            cursor: 'pointer',
            marginBottom: '20px',
            width: '2vw',
            height: '2vw',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)'
          }}
          whileHover={{ scale: 1.1 }}
          onClick={switchToWhiteModel}
        />
        <motion.div
          style={{
            cursor: 'pointer',
            marginBottom: '5vh',
            width: '2vw',
            height: '2vw',
            borderRadius: '50%',
            backgroundColor: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)'
          }}
          whileHover={{ scale: 1.1 }}
          onClick={switchToBlackModel}
        />

        <motion.div
          onClick={() => switchModel('hoodie_black')}
          whileHover={{ scale: 1.1 }}
          style={{ cursor: 'pointer', marginBottom: '10px' }}
        >
          NY-001
        </motion.div>
        <motion.div
          onClick={() => switchModel('sweater_black')}
          whileHover={{ scale: 1.1 }}
          style={{ cursor: 'pointer' }}
        >
          TK-001
        </motion.div>
      </div>

      <div className="info">


        {/* animated words */}
        <List open={state.open}>
          <h3>{modelInfoText}</h3>
          <h4>{modelInfoText01}</h4>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2em' }}>
            <p className="price">
            $50.51</p>
            <img src="public/assets/Shopping Cart.png" alt="Cart" style={{ width: 30, marginLeft: '10px', marginTop:'10px' }} />
          </div>

          <p>
            {modelInfoText02}
          </p>
        </List>


      </div>

      <img src="public/assets/logo.png" alt="Logo" style={{ position: 'absolute', top: 40, left: 40, width: 150 }} />
      <img src="public/assets/Shopping Bag.png" alt="Bag" style={{ position: 'absolute', top: 40, right: 60, width: 30 }} />

    </>
  )
}
