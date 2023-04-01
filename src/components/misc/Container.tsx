type PropsType<C extends React.ElementType> =
  React.ComponentPropsWithoutRef<C> & {
    as?: C;
  };

const Container = <C extends React.ElementType = "div">({
  as,
  className = "",
  ...props
}: PropsType<C>) => {
  const Element = as || "div";
  return (
    <Element
      {...props}
      className={`${className} max-w-5xl mx-auto px-4 md:px-6`}
    />
  );
};

export default Container;
