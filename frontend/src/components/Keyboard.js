const Keyboard = ({ handleKeystroke }) => {
  return (
    <div className="keyboardContainer">
      <div className="keyRow">
        <button className="key esc" onClick={() => handleKeystroke()}>
          Esc
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          1
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          2
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          3
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          4
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          5
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          6
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          7
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          8
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          9
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          0
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          -
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          =
        </button>
        <button className="key backspace" onClick={() => handleKeystroke()}>
          ←
        </button>
      </div>
      <div className="keyRow">
        <button className="key tab" onClick={() => handleKeystroke()}>
          Tab
        </button>
        <button className="key" onClick={() => handleKeystroke("q")}>
          Q
        </button>
        <button className="key" onClick={() => handleKeystroke("w")}>
          W
        </button>
        <button className="key" onClick={() => handleKeystroke("e")}>
          E
        </button>
        <button className="key" onClick={() => handleKeystroke("r")}>
          R
        </button>
        <button className="key" onClick={() => handleKeystroke("t")}>
          T
        </button>
        <button className="key" onClick={() => handleKeystroke("y")}>
          Y
        </button>
        <button className="key" onClick={() => handleKeystroke("u")}>
          U
        </button>
        <button className="key" onClick={() => handleKeystroke("i")}>
          I
        </button>
        <button className="key" onClick={() => handleKeystroke("o")}>
          O
        </button>
        <button className="key" onClick={() => handleKeystroke("p")}>
          P
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          {"["}
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          {"]"}
        </button>
        <button className="key bar" onClick={() => handleKeystroke()}>
          \
        </button>
      </div>
      <div className="keyRow">
        <button className="key caps" onClick={() => handleKeystroke()}>
          Caps Lk
        </button>
        <button className="key" onClick={() => handleKeystroke("a")}>
          A
        </button>
        <button className="key" onClick={() => handleKeystroke("s")}>
          S
        </button>
        <button className="key" onClick={() => handleKeystroke("d")}>
          D
        </button>
        <button className="key" onClick={() => handleKeystroke("f")}>
          F
        </button>
        <button className="key" onClick={() => handleKeystroke("g")}>
          G
        </button>
        <button className="key" onClick={() => handleKeystroke("h")}>
          H
        </button>
        <button className="key" onClick={() => handleKeystroke("j")}>
          J
        </button>
        <button className="key" onClick={() => handleKeystroke("k")}>
          K
        </button>
        <button className="key" onClick={() => handleKeystroke("l")}>
          L
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          ;
        </button>
        <button className="key" onClick={() => handleKeystroke()}>
          '
        </button>
        <button className="key enter" onClick={() => handleKeystroke()}>
          Enter ↵
        </button>
      </div>
      <div className="keyRow">
        <button className="key shiftLeft" onClick={() => handleKeystroke()}>
          Shift
        </button>
        <button className="key" onClick={() => handleKeystroke("z")}>
          Z
        </button>
        <button className="key" onClick={() => handleKeystroke("x")}>
          X
        </button>
        <button className="key" onClick={() => handleKeystroke("c")}>
          C
        </button>
        <button className="key" onClick={() => handleKeystroke("v")}>
          V
        </button>
        <button className="key" onClick={() => handleKeystroke("b")}>
          B
        </button>
        <button className="key" onClick={() => handleKeystroke("n")}>
          N
        </button>
        <button className="key" onClick={() => handleKeystroke("m")}>
          M
        </button>
        <button className="key" onClick={() => handleKeystroke(",")}>
          ,
        </button>
        <button className="key" onClick={() => handleKeystroke(".")}>
          .
        </button>
        <button className="key" onClick={() => handleKeystroke("/")}>
          /
        </button>
        <button className="key shiftRight" onClick={() => handleKeystroke()}>
          Shift
        </button>
      </div>
      <div className="keyRow">
        <button
          className="key bottomKey ctrlLeft"
          onClick={() => handleKeystroke()}
        >
          Ctrl
        </button>
        <button
          className="key bottomKey winLeft"
          onClick={() => handleKeystroke()}
        >
          Win
        </button>
        <button className="key bottomKey alt" onClick={() => handleKeystroke()}>
          Alt
        </button>
        <button className="key space" onClick={() => handleKeystroke(" ")}>
          ───────────
        </button>
        <button
          className="key bottomKey altGr"
          onClick={() => handleKeystroke()}
        >
          Alt Gr
        </button>
        <button
          className="key bottomKey winRight"
          onClick={() => handleKeystroke()}
        >
          Win
        </button>
        <button
          className="key bottomKey menuKey"
          onClick={() => handleKeystroke()}
        >
          Menu
        </button>
        <button
          className="key bottomKey ctrlRight"
          onClick={() => handleKeystroke()}
        >
          Ctrl
        </button>
      </div>
    </div>
  );
};
export default Keyboard;
