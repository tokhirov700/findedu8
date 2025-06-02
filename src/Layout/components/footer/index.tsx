import { Layout, Row, Col } from 'antd';
import {
  FacebookOutlined,
  InstagramOutlined,
  SendOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="footer text-white py-10 px-6" style={{background: 'var(--primary-color)'}}>
      <Row gutter={[32, 16]}>
        <Col xs={24} md={6}>
          <h1 className="text-xl font-bold text-yellow-400 mb-4">F<span className="text-white">ndedu.uz</span></h1>
          <p className="text-xs text-gray-300">© 2025 Findedu. All Rights Reserved. Best Girls</p>
        </Col>

        <Col xs={12} md={4}>
          <ul className="space-y-2 text-white">
            <li>Bosh sahifa</li>
            <li>O'quv Markazlar</li>
            <li>Biz haqimizda</li>
          </ul>
        </Col>

        <Col xs={12} md={4}>
          <ul className="space-y-2 text-white">
            <li>Aloqa</li>
            <li>Sharhlar</li>
            <li>Loyihalar</li>
          </ul>
        </Col>

        <Col xs={12} md={4}>
          <ul className="space-y-2 text-white">
            <li>IT</li>
            <li>Matematika</li>
            <li>Marketing</li>
            <li>SAT</li>
          </ul>
        </Col>

        <Col xs={12} md={4}>
          <ul className="space-y-2 text-white">
            <li>Ingliz tili</li>
            <li>SMM</li>
            <li>Dizayn</li>
            <li>Biznes</li>
          </ul>
        </Col>

        <Col xs={24} md={2} className="flex items-center justify-start md:justify-end space-x-4 text-xl text-white">
          <FacebookOutlined />
          <InstagramOutlined />
          <SendOutlined />
          <YoutubeOutlined />
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
