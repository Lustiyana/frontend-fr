import stylesloader from "./style.module.css";
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className={`${stylesloader.loader}`}>
        <div className={stylesloader.loader_inner}></div>
      </div>
    </div>
  );
};

export default Loader;
