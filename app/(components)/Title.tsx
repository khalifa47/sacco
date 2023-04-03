const Title = ({
  title,
  pageTitle = false,
}: {
  title: string;
  pageTitle?: boolean;
}) => {
  return (
    <h4
      style={{
        fontFamily: "Roboto,Helvetica,Arial,sans-serif",
        fontWeight: 600,
        fontSize: pageTitle ? "2rem" : "1.5rem",
        margin: 10,
        padding: 0,
      }}
    >
      {title}
    </h4>
  );
};

export default Title;
