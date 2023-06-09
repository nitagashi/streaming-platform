import { Stage, Container, Text, Graphics } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';

function CircularProgress(props) {
  const [angle, setAngle] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const draw = useCallback((g) => {
    g.clear();
    g.beginFill(0x1e1e2b);
    g.drawCircle(50, 50, 34);
    g.endFill();
    g.beginFill(0x535377);
    g.drawCircle(50, 50, 30);
    g.endFill();
    g.beginFill(0x8b0000, 1);
    g.arc(50, 50, 30.5, angle - Math.PI / 2, -Math.PI / 2, true);
    g.lineTo(50, 50);
    g.endFill();
    g.beginFill(0x1e1e2b);
    g.drawCircle(50, 50, 25);
  }, [angle]);
  useEffect(() => {
    if(!isNaN(props.percentage)){
      setMounted(true);      
    }
    console.log(props);
  }, [props.percentage]);
  useEffect(() => {
    if (!isNaN(props.percentage)) {
      const targetAngle = (Math.PI * 2 * props.percentage) / 100;
      const interval = setInterval(() => {
        setAngle((prevAngle) => {
          const newAngle = prevAngle + Math.PI / 180; 
          var percentage = Math.round(newAngle*100/(2*Math.PI));
          setProgress(percentage)
          if(percentage >= props.percentage){
            clearInterval(interval);
          }
          return newAngle > targetAngle ? targetAngle : newAngle;
        });
        console.log(angle);
      }, 1);
      return () => {
        clearInterval(interval);
      };
    }
  }, [mounted]);

  return (
    <Stage width={90} height={90} options={{ backgroundAlpha: 0 }}>
      <Graphics draw={draw} />
      <Container x={50} y={50}>
        <Text text={`${progress}%`} anchor={{ x: 0.5, y: 0.5 }} style={{ fill: '#ffffff', fontWeight: 'bold', fontSize: '12pt' }} />
      </Container>
    </Stage>
  );
}
export default CircularProgress;