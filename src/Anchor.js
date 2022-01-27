const Anchor = (props) => {
  console.log(props.link, props.name);
  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      {props.name}
    </a>
  );
};

export default Anchor;
