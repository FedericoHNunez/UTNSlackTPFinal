export const SlackLogo = ({ color = "black" }) => {

    let img;
    if (color == "black") {
        img = <img alt="Slack" height="26" title="Slack" src="https://a.slack-edge.com/bv1-13/slack_logo-97f7334.svg"></img>
    }
    else if (color == "white") {
        img = <img alt="Slack" height="26" title="Slack" src="https://a.slack-edge.com/bv1-13/slack_logo-d072718.svg"></img>
    }
    return img
}   