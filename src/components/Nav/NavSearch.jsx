import React, { Component } from 'react';
import Box from '3box';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { checkIsEthAddress, shortenEthAddr } from '../../utils/funcs';

import GithubIcon from '../../assets/GithubIcon.svg';
import TwitterIcon from '../../assets/twitterGrey.svg';
import Website from '../../assets/Website.png';
import ProfilePicture from '../ProfilePicture';
import Search from '../../assets/Search.svg';

class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEthAddr: false,
      searchTerm: '',
      searchedProfile: null,
      isEmptyProfile: false,
    };
  }

  handleInputEdit = async (e) => {
    const { value } = e.target;

    let isEthAddr;
    if (value.length === 42) isEthAddr = checkIsEthAddress(value);
    const showResults = true;
    this.setState({ searchTerm: value, isEthAddr, showResults });

    if (isEthAddr) {
      const searchedProfile = await Box.getProfile(value);

      if (Object.entries(searchedProfile).length) {
        const verifiedAccouts = await Box.getVerifiedAccounts(searchedProfile);
        searchedProfile.github = verifiedAccouts.github && verifiedAccouts.github.username;
        searchedProfile.twitter = verifiedAccouts.twitter && verifiedAccouts.twitter.username;
        this.setState({ searchedProfile });
      } else {
        this.setState({ isEmptyProfile: true });
      }
    } else {
      this.setState({ searchedProfile: null });
    }
  }

  clearSearch = () => this.setState({ searchedProfile: null, searchTerm: '' });

  handleToggleResults = () => this.setState({ showResults: !this.state.showResults })

  render() {
    const {
      isEthAddr,
      searchedProfile,
      searchTerm,
      isEmptyProfile,
      showResults,
    } = this.state;

    const { showMobileSearch, handleMobileSearch } = this.props;

    return (
      <>
        <div className="navSearch">
          <input
            type="text"
            className="navSearch_input"
            placeholder="Search user by Ethereum address..."
            onChange={(e) => this.handleInputEdit(e)}
            onFocus={this.handleToggleResults}
            value={searchTerm}
          />

          {(searchedProfile && showResults) && (
            <Link to={`/${searchTerm}`} onClick={this.clearSearch}>
              <div className="navSearch_input_result">
                <ProfilePicture
                  pictureClass="navSearch_input_result_image"
                  imageToRender={searchedProfile.image}
                  otherProfileAddress={searchTerm}
                  isMyPicture={false}
                />

                <div className="navSearch_input_result_info">
                  <h3>
                    {searchedProfile.name || shortenEthAddr(searchTerm)}
                  </h3>

                  {searchedProfile.description && (
                    <p className="navSearch_input_result_info_description">
                      {searchedProfile.description}
                    </p>
                  )}

                  {(searchedProfile.twitter || searchedProfile.github || searchedProfile.website) && (
                    <div className="navSearch_input_result_info_social">
                      {searchedProfile.twitter && (
                        <span>
                          <img src={TwitterIcon} className="navSearch_input_result_info_social_icon" alt="Github Icon" />
                          <p>
                            {searchedProfile.twitter}
                          </p>
                        </span>
                      )}

                      {searchedProfile.github && (
                        <span>
                          <img src={GithubIcon} className="navSearch_input_result_info_social_icon" alt="Github Icon" />
                          <p>
                            {searchedProfile.github}
                          </p>
                        </span>
                      )}

                      {searchedProfile.website && (
                        <span>
                          <img src={Website} className="navSearch_input_result_info_social_icon" alt="Website Icon" />
                          <p>
                            {searchedProfile.website}
                          </p>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )}

          {(isEmptyProfile && showResults) && (
            <div className="navSearch_input_result">
              <h4>
                No profile for this address
              </h4>
            </div>
          )}

          {(!isEthAddr && searchTerm && showResults) && (
            <div className="navSearch_input_result">
              <h4>
                Enter a valid Ethereum address
              </h4>
            </div>
          )}
        </div>

        <button
          className={`nav_openSearch-mobile ${showMobileSearch ? 'open' : 'closed'}`}
          type="button"
          onClick={handleMobileSearch}
        >
          <img
            src={Search}
            alt="Search"
            className="nav_openSearch_icon"
          />
        </button>

        <input
          type="text"
          className={`navSearch_input-mobile ${showMobileSearch ? 'open' : 'closed'}`}
          placeholder="Search user by Ethereum address..."
          onChange={(e) => this.handleInputEdit(e)}
          onFocus={this.handleToggleResults}
          value={searchTerm}
        />

        {showResults && (
          <div
            className="onClickOutside"
            onClick={this.handleToggleResults}
            onKeyPress={this.handleToggleResults}
            tabIndex={0}
            role="button"
          />
        )}
      </>
    );
  }
}

NavSearch.propTypes = {
  showMobileSearch: PropTypes.bool,
  handleMobileSearch: PropTypes.func,
};

NavSearch.defaultProps = {
  showMobileSearch: false,
  handleMobileSearch: false,
};

export default NavSearch;