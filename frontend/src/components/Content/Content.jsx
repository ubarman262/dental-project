/* eslint-disable react/prop-types */
function Content(props) {
  const { children } = props;
  return (
    <div className="main-content-container">
      <div id="back-to-top-anchor"></div>
      {children}
    </div>
  );
}

export default Content;
