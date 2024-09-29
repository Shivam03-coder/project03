import { Comment } from "react-loader-spinner";

function Apploading() {
  return (
    <div className="w-full h-screen bg-black flex-center ">
      <Comment
        visible={true}
        height="130"
        width="130"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#FF71CD"
        backgroundColor="#F4442E"
      />
    </div>
  );
}

export default Apploading;
