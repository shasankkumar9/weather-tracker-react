/* eslint-disable react/prop-types */
function Img({ src, alt }) {
  return (
    <div className="drop-shadow-2xl h-full rounded-full bg-sky-300">
      <img src={src} alt={alt} />
    </div>
  );
}
export default Img;
