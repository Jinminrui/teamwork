import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import './index.scss';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';
import { useSelector } from 'react-redux';
import { Store } from 'types';
import Base from './components/Base';
import Security from './components/Security';

const { Item } = Menu;

type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline'
  | undefined;

const PersonalSetting: React.FC<RouteComponentProps> = props => {
  const [mode, setMode] = useState<MenuMode>('inline');
  const clientWidth = useSelector((store: Store) => store.app.screenWidth);

  useEffect(() => {
    if (clientWidth < 769) {
      setMode('horizontal');
    } else {
      setMode('inline');
    }
  }, [clientWidth]);

  function handleItemClick({ key }: ClickParam) {
    props.history.push(`/home/personal-settings/${key}`);
  }

  return (
    <div className="personal-setting-wrapper">
      <div className="main-container">
        <Menu
          defaultSelectedKeys={['base']}
          mode={mode}
          style={mode === 'inline' ? { width: '224px' } : {}}
          onClick={handleItemClick}
        >
          <Item key="base">基本设置</Item>
          <Item key="security">安全设置</Item>
        </Menu>
        <div className="right-content">
          <Switch>
            <Route path="/home/personal-settings/base" component={Base} exact />
            <Route
              path="/home/personal-settings/security"
              component={Security}
              exact
            />
            <Redirect to="/home/personal-settings/base" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default PersonalSetting;
