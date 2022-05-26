import moment from "moment";

export default function Time(props) {
  const formatDate = () => {
    let post_date = moment(props.date);
    let current_date = moment();
    let difference = current_date.diff(post_date, "days");
    if (difference <= 0) {
      return moment(props.date).fromNow();
    }
    return moment(props.date).format("LL");
  };
  return formatDate();
}
