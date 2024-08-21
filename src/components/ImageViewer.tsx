import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

type ImageViewerProps = React.PropsWithChildren<{
  src: string;
  alt?: string;
}>;
function ImageViewer(props: ImageViewerProps) {
  const { children, src, alt } = props;
  return (
    <PhotoProvider maskOpacity={0.75} maskClassName="backdrop-blur-sm">
      <PhotoView key={src} src={src}>
        <img src={src} alt={alt} className="cursor-zoom-in" />
      </PhotoView>
    </PhotoProvider>
  );
}

export default ImageViewer;
