const Title = ({
  title,
  pageTitle,
}: {
  title: string;
  pageTitle?: boolean;
}) => {
  return (
    <h4
      style={{
        fontFamily: "Roboto,Helvetica,Arial,sans-serif",
        fontWeight: 600,
        fontSize: pageTitle ? "1.5rem" : "1.1rem",
        marginTop: 0,
        marginBottom: 10,
        padding: 0,
      }}
    >
      {title}
    </h4>
  );
};

export default Title;
