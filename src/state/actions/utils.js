import {
  ethers,
} from 'ethers';

const fetchEns = async (address, web3Obj) => {
  try {
    const currentProvider = web3Obj ? web3Obj.currentProvider : (web3 && web3.currentProvider); // eslint-disable-line

    if (currentProvider) {
      const provider = new ethers.providers.Web3Provider(currentProvider);
      const name = await provider.lookupAddress(address);
      if (name) return name;
    }

    const ensDomainRequest = {
      query: ` {
          domains(where:{ owner: "${address}" }) {
            name
          }
        }`,
    };

    const res = await fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
      method: 'POST',
      body: JSON.stringify(ensDomainRequest),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200 && res.status !== 201) throw new Error('Failed', res);

    const {
      data,
      errors,
    } = await res.json();

    if (data.domains.length) return data.domains[0].name;
    if (errors) return errors;
    return null;
  } catch (error) {
    console.log('ensRequest', error);
  }
};

export default fetchEns;