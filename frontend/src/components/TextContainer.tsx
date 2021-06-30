import Text from "./Text";
import { KeyStateType } from "~/reducers/keyReducer";
export interface TextContainerProps {
  keyState: KeyStateType;
}

const TextContainer: React.FunctionComponent<TextContainerProps> = ({
  keyState,
}) => {
  const { words, currentIndex, correctIndices, incorrectIndices } = keyState;
  return (
    <Text>
      {words
        .join("␣")
        .split("")
        .map((char, i) => (
          <span
            key={i}
            className={`${
              incorrectIndices.has(i)
                ? i === currentIndex
                  ? "text-wrong currentKey"
                  : "text-wrong"
                : i === currentIndex
                ? "currentKey"
                : correctIndices.has(i)
                ? "text-typed"
                : ""
            }`}
          >
            {char}
            {char === "␣" && <wbr />}
          </span>
        ))}
    </Text>
  );
};

export default TextContainer;
