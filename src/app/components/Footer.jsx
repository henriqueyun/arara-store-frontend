import { Grid, Link, Stack, Typography } from "@mui/material";

export default function Footer() {
    {/* TODO: use theme to set colors */ }
    return (
        <Grid container p={4} justifyContent="space-evenly" alignItems="center" sx={{ backgroundColor: "#323232", color: "white" }}>
            <FooterSection title="ARARASTORE" links={[{ title: "Sobre", href: "#" }, { title: "Ajuda", href: "#" }, { title: "Nossas Lojas", href: "#" }, { title: "Trocas e Deveoluções", href: "#" }, { title: "Central e Privacidade", href: "#" }, { title: "Política de Privacidade", href: "#" }]} />
            <FooterSection title="SOCIAL MEDIA" links={[{ title: "Instagram", href: "#" }, { title: "Linkedin", href: "#" }, { title: "Facebook", href: "#" }, { title: "Twitter", href: "#" }]} />
        </Grid >
    )
}

function FooterSection(props) {
    const { title, links } = props;

    function splitArrInTwo(arr) {
        const halfIndex = Math.ceil(arr.length / 2);
        const firstHalf = arr.slice(0, halfIndex);
        const secondHalf = arr.slice(halfIndex);
        return [firstHalf, secondHalf];
    }

    const splitedLinks = splitArrInTwo(links)

    return (
        <Grid display="flex" gap={2} flexDirection="column">
            <Typography variant="h4">{title}</Typography>
            <Grid display="flex" gap={3}>
                {splitedLinks.map(halfLinks =>
                    <Stack gap={1}>
                        {halfLinks.map(link =>
                            <Link color="inherit" underline="none" href={link.href} variant="h6">{link.title}</Link>
                        )}
                    </Stack>)
                }
            </Grid>
        </Grid>
    );
}