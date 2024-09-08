import { Link } from "@tanstack/react-router";

const NotFound = () => {
  return (
    <>
      <p className="mb-5">ページが見つかりませんでした。</p>
      <p>
        <Link to="/" className="underline text-blue-800">
          ホームへ戻る
        </Link>
      </p>
    </>
  );
};

export default NotFound;
