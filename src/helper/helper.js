import { topMenuItems } from '../common/leftSideMenu';
import { Colors } from '../common/colors';
import React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import BackspaceIcon from '@material-ui/icons/Backspace';

export const ContentPerMenu = ({ currentMenu }) => {
  return topMenuItems.filter(menu => menu.id === currentMenu)[0].body;
};

export const ObjectGeneratorForCustomSelect = (id, value = '') => ({ id, value });

export const GetAfterUnderscore = str => str.substr(str.indexOf('_') + 1, str.length);

export const GetBeforeUnderscore = str => str.substr(0, str.indexOf('_'));

/**
 * Function to animate scroll
 * @param destination
 * @param duration
 * @param easing
 * @param callback
 * @returns {number|*}
 */
export const scrollIt = (destination, duration = 200, easing = 'linear', callback) => {

  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
};

export const getVisitStatus = (status) => {
  // eslint-disable-next-line radix
  switch (parseInt(status)) {
    case 0:
      return (<div className="visit-status-label" style={{
        background: 'rgba(243, 170, 24, 0.23)',
      }}>
        <HourglassEmptyIcon style={{ color: '#F3AA18', fontSize: 18, verticalAlign: 'middle' }}/>&nbsp;<span>Idle</span>
      </div>);
    case 1:
      return (<div className="visit-status-label" style={{
        background: 'rgba(54, 123, 245, 0.23)',
      }}>
        <AccessTimeIcon style={{ color: '#367BF5', fontSize: 18, verticalAlign: 'middle' }}/>&nbsp;<span>In Progress</span>
      </div>);
    case 2:
      return (<div className="visit-status-label" style={{
        background: 'rgba(47, 168, 79, 0.23)',
      }}>
        <EventAvailableIcon style={{ color: '#2FA84F', fontSize: 18, verticalAlign: 'middle' }}/>&nbsp;<span>Completed</span>
      </div>);
    default:
      return (<div className="visit-status-label" style={{
        background: '#F7F9FA',
      }}>
        <AccessTimeIcon style={{ color: '#F3AA18', fontSize: 18, verticalAlign: 'middle' }}/>&nbsp;<span>Idle</span>
      </div>);
  }
};

/**
 * 1 -> Added
 * 2 -> Edited
 * 3 -> Deleted
 * @param status
 * @returns {*}
 */
export const getTimelineIcons = (status) => {
  switch (parseInt(status)) {
    case 1:
      return <AddIcon/>;
    case 2:
      return <EditIcon/>;
    case 3:
      return <BackspaceIcon/>;
    default:
      break;
  }
};

export const getTimelineIconStyle = (status) => {
  switch (parseInt(status)) {
    case 1:
      return { background: Colors.primary, color: '#fff' };
    case 2:
      return { background: Colors.success, color: '#fff' };
    case 3:
      return { background: Colors.danger, color: '#fff' };
    default:
      break;
  }
};

/**
 * CSS styling, with adefault theme
 * @param theme
 * @param addedThemes
 * @returns {any}
 */
export const themeStyler = (theme, addedThemes) => {
  const defaultTheme = {
    // Header styles
    headerStyle: {
      fontFamily: 'Quicksand',
      fontSize: 34,
      verticalAlign: 'middle',
      [theme.breakpoints.down('md')]: {
        fontSize: 24,
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: 18,
        fontWeight: 'bold',
      }
    },
    subHeaderStyle: {
      fontSize: 24,
      fontWeight: 500,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      }
    },
    headerTitle: {
      display: 'flex',
      verticalAlign: 'middle',
      margin: '16px 0',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        margin: '14px 0',
      },
      [theme.breakpoints.down('sm')]: {
        margin: '12px 0',
      },
      [theme.breakpoints.down('xs')]: {
        margin: '8px 0',
      },
    },
    iconStyle: {
      fontSize: 18,
      marginRight: 8
    },

    // Flex spacing styles
    spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      verticalAlign: 'middle',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    spaceAround: {
      display: 'flex',
      verticalAlign: 'middle',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },

    // Width styles
    gridWrapper: {
      transition: '0.5s',
      [theme.breakpoints.down('sm')]: {
        width: 'unset',
      }
    },

    // Button styles
    buttonStyle: {
      marginLeft: 12,
      marginRight: 6,
      borderRadius: 50,
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2)',
      [theme.breakpoints.down('md')]: {
        marginTop: 12,
      }
    },
    // for buttons only
    successButtonStyle: {
      border: `1px solid ${Colors.success}`,
    },
    dangerButtonStyle: {
      border: `1px solid ${Colors.danger}`,
    },
    primaryButtonStyle: {
      border: `1px solid ${Colors.primary}`,
    },
    // for icons inside the buttons
    successStyle: {
      color: Colors.success,
    },
    primaryStyle: {
      color: Colors.primary,
    },
    dangerStyle: {
      color: Colors.danger,
    },

    // Color styles
    positive: {
      color: Colors.positive
    },
    negative: {
      color: Colors.danger
    },
    gray: {
      color: Colors.disabled,
    },

    avatar: {
      height: 50,
      width: 50,
      borderRadius: '50%'
    }

  };
  return Object.assign({}, defaultTheme, addedThemes);
};
