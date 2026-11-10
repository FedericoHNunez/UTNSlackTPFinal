export const SlackLogo = ({ color = "black" }) => {
    let img;
    if (color === "black") {
        img = (
            <img
                alt="Slack"
                height="26"
                title="Slack"
                src="https://a.slack-edge.com/bv1-13/slack_logo-97f7334.svg"
            />
        );
    } else if (color === "white") {
        img = (
            <img
                src="https://a.slack-edge.com/e3d847e/marketing/img/nav/slack-salesforce-logo-nav-white.png"
                srcSet="https://a.slack-edge.com/e3d847e/marketing/img/nav/slack-salesforce-logo-nav-white.png 1x, https://a.slack-edge.com/5c4081f/marketing/img/nav/slack-salesforce-logo-nav-white@2x.png 2x"
                alt="Slack"
                height="40"
                className="c-slacklogo--white"
            />
        );
    }
    return img;
};
