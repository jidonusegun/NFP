
const BlogPostStyle = {
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    
      },
      cardContent: {
        flex: "0 0 100%",
        backgroundColor: "white",
        padding: "1rem",
        marginBottom: "2rem",
        borderRadius: "10px",
        [theme.breakpoints.up('sm')]: {
          flex: "0 0 calc(50% - 1rem)",
        },
        [theme.breakpoints.up('md')]: {
          flex: "0 0 calc(29% - 1rem)",
        },
        [theme.breakpoints.up('lg')]: {
          flex: "0 0 calc(25% - 1rem)",
        },
      },
      header: {
        margin: "0",
        fontSize: "1rem",
        fontWeight: "bold",
      },
      footer: {
        textAlign: "right",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: ".6rem",
        margin: "0 .5rem",
      },
      readMore: {
        textAlign: "right",
        fontSize: ".6rem",
        margin: ".5rem",
      },
      span: {
        fontWeight: "normal",
      },
      paragraph: {
        height: "4rem",
        // -webkitBoxOrient: "vertical",
        display: "-webkit-box",
        // -webkitLineClamp: "2",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
      paragraphAll: {
        height: "unset",
        // -webkitBoxOrient: "vertical",
        display: "unset",
        // -webkitLineClamp: "2",
        overflow: "unset",
        textOverflow: "unset",
        whiteSpace: "unset",
      }
};

export default BlogPostStyle;