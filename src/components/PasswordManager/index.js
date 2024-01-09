import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    showPasswords: false,
    searchKeyword: '',
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      website: '',
      password: '',
      username: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onToggleShowPasswords = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  onDelete = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(each => each.id !== id),
    }))
  }

  onSearch = event => {
    this.setState({searchKeyword: event.target.value})
  }

  render() {
    const {
      passwordList,
      website,
      password,
      username,
      showPasswords,
      searchKeyword,
    } = this.state

    const filteredPasswords = passwordList.filter(passwordItem =>
      passwordItem.website.toLowerCase().includes(searchKeyword.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <div className="main-container">
          <div className="app-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app-image"
            />
          </div>
          <div className="container-1">
            <form className="form-container" onSubmit={this.onAddNewPassword}>
              <h1 className="form-title">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="btn-container">
                <button className="btn" type="submit">
                  Add
                </button>
              </div>
            </form>
            <div className="container-1-img">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-img"
              />
            </div>
          </div>
          <div className="container-2">
            <div className="cont2-top-container">
              <div className="cont2-head">
                <h1 className="heading">Your Passwords</h1>
                <p className="count">{filteredPasswords.length}</p>
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-img"
                />
                <input
                  type="search"
                  className="input"
                  placeholder="Search"
                  onChange={this.onSearch}
                />
              </div>
            </div>
            <hr style={{width: '100%', color: '#7683cb'}} />
            <div className="show-container">
              <input
                type="checkbox"
                className="check"
                onChange={this.onToggleShowPasswords}
                id="id1"
              />
              <label htmlFor="id1">Show Passwords</label>
            </div>
            <ul className="check-cont">
              {filteredPasswords.length > 0 ? (
                filteredPasswords.map(passwordItem => (
                  <li className="add-container list" key={passwordItem.id}>
                    <button className="btn-icon" type="button">
                      {passwordItem.website[0].toUpperCase()}
                    </button>
                    <div className="add-small-cont">
                      <p className="add-text">{passwordItem.website}</p>
                      <p className="add-text">{passwordItem.username}</p>
                      <p className="add-text">
                        {showPasswords ? (
                          passwordItem.password
                        ) : (
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                            alt="stars"
                            className="str-img"
                          />
                        )}
                      </p>
                    </div>
                    <button
                      className="add-btn"
                      type="button"
                      onClick={() => this.onDelete(passwordItem.id)}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="add-img"
                      />
                    </button>
                  </li>
                ))
              ) : (
                <div className="cont2-show-password-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="pass-img"
                  />
                  <p className="passwords-details">No Passwords</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
