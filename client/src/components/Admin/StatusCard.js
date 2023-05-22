import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";

export default function StatusCard({
  color,
  title,
  amount,
  percentage,
  percentageColor,
  percentageIcon,
  date,
  MainIcon,
}) {
  return (
    <div className="px-4 mb-4 -mt-8">
      <Card>
        <CardRow>
          <CardHeader
            style={{ width: "30px", height: "100px" }}
            color={color}
            iconOnly
            className="mb-0"
          >
            {/* <Icon name={icon} size="3xl" color="white" /> */}
            <MainIcon className="text-2xl" />
          </CardHeader>

          <CardStatus title={title} amount={amount} />
        </CardRow>

        <CardStatusFooter
          amount={percentage}
          color={percentageColor}
          date={date}
        ></CardStatusFooter>
      </Card>
    </div>
  );
}
