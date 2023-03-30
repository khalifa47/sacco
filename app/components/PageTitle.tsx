const PageTitle = ({ title }: { title: string }) => {
  return (
    <h4
      style={{
        fontFamily: "Roboto,Helvetica,Arial,sans-serif",
        fontWeight: 600,
        fontSize: "2rem",
        margin: 10,
        padding: 0,
      }}
    >
      {title}
    </h4>
  );
};

export default PageTitle;
