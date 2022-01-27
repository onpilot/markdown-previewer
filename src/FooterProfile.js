const FooterProfile = (props) => {
  let iconClass = `bi-${props.profile}`;
  let ariaLabel = props.profile;
  let link = '';
  if (props.profile === 'github') {
    link = `https://${props.profile}.com/onpilot`;
  }
  if (props.profile === 'linkedin') {
    link = `https://www.${props.profile}.com/in/onpilot`;
  }
  if (props.profile === 'twitter') {
    link = `https://${props.profile}.com/onpilot_`;
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <i className={iconClass} role="img" aria-label={ariaLabel}></i>
    </a>
  );
};

export default FooterProfile;
