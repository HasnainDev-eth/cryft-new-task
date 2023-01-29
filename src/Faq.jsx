import Faq from "react-faq-component";
import "./Faq.css";

const data = {
  title: "FAQ",
  rows: [
    {
      title: "What is a Cryft Code?",
      content: "A Cryft Code is much like any gift code, but here you receive blockchain collectibles in return!",
    },
    {
      title: "Does a Cryft Code Expire?",
      content:
        "We recommend you redeem all codes as soon as possible.",
    },
    {
      title: "Are email generated wallets non-custodial?",
      content:
        "Yes! Wallets are managed by a service called MagicLink!",
    },
    {
      title: "How can I contact for help?",
      content: "Please message us on Twitter or help@cryftcards.com",
    },
    {
      title: "Is this a production application?",
      content: "We are in pilot. New user experience imminent.",
    },
  ],
};
const styles = {
  bgColor: "#000",
  titleTextColor: "#fff",
  rowTitleColor: "#FFF",
  rowContentColor: "#fff",
  arrowColor: "#fff",
};

export default function App() {
  return <Faq data={data} styles={styles} />;
}
