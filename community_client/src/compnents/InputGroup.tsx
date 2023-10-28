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
            w-full transition duration-150 border-gray-300 
            rounded-md bg-gray-50 focus:bg-white hover:bg-white`,
          // error가 있으면 이거 true로
          { 'border-red-500': error },
        )}
      />
      <small className="font-medium text-red-500">{error} </small>
    </div>
  );
};

export default InputGroup;
