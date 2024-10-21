// Tooltips (by Tippy.JS)
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/animations/shift-away.css';

const Account = () => {
  return (
    <div className="flex justify-center md:justify-end gap-2">
      <Tippy content={"This doesn't work!"} placement="bottom" arrow={false} animation="shift-away" theme="translucent">
        <button className="btn btn-account">
          Log In
        </button>
      </Tippy>
      <Tippy content={"It's just visuals!"} placement="bottom" arrow={false} animation="shift-away" theme="translucent">
        <button className="btn btn-account">
          Log Out
        </button>
      </Tippy>
    </div>
  );
};

export default Account;
