/* eslint-disable react/prop-types */
import {
  Grid, Link, Stack, Typography,
} from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Grid
      container
      p={4}
      justifyContent="space-evenly"
      alignItems="center"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        color: (theme) => theme.palette.background.default,
      }}
    >
      <FooterSection
        title="ARARASTORE"
        links={[{ title: 'Sobre', href: '#' },
          { title: 'Ajuda', href: '#' },
          { title: 'Nossas Lojas', href: '#' },
          { title: 'Trocas e Deveoluções', href: '#' },
          { title: 'Central e Privacidade', href: '#' },
          { title: 'Política de Privacidade', href: '#' }]}
      />
      <FooterSection
        title="SOCIAL MEDIA"
        links={[{ title: 'Instagram', href: '#' },
          { title: 'Linkedin', href: '#' },
          { title: 'Facebook', href: '#' },
          { title: 'Twitter', href: '#' }]}
      />
    </Grid>
  );
}

function FooterSection(props) {
  const { title, links } = props;

  function splitArrInTwo(arr) {
    const halfIndex = Math.ceil(arr.length / 2);
    const firstHalf = arr.slice(0, halfIndex);
    const secondHalf = arr.slice(halfIndex);
    return [firstHalf, secondHalf];
  }

  const splittedLinks = splitArrInTwo(links);

  return (
    <Grid display="flex" gap={2} flexDirection="column">
      <Typography variant="h4">{title}</Typography>
      <Grid display="flex" gap={3}>
        {splittedLinks.map((halfLinks) => (
          <Stack gap={1} key={`half-links-${halfLinks[0].title}`}>
            {halfLinks.map((link) => <Link key={link.title} color="inherit" underline="none" href={link.href} variant="h6">{link.title}</Link>)}
          </Stack>
        ))}
      </Grid>
    </Grid>
  );
}
