module.exports = {
    async redirects() {
      return [
        {
          source: '/composition',
          destination: '/works',
          permanent: true,
        },
        {
          source: '/guitar',
          destination: '/',
          permanent: true,
        },
      ];
    },
  };