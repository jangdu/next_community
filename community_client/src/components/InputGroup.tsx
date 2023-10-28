import classNames from 'classnames';

interface InputGroupProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  className = 'mb-2',
  type = 'text',
  placeholder = '',
  error,
  value,
  setValue,
}) => {
  return (
    <div>
      <input
        type={type}
        style={{ minWidth: 300 }}
        className={classNames(
          `
            w-full transition p-2 duration-150 mb-2 border-gray-300 
            rounded-md bg-gray-100 focus:bg-white`,
          // error가 있으면 이거 true로
          { 'border-red-500': error },
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-500">{error} </small>
    </div>
  );
};

export default InputGroup;
