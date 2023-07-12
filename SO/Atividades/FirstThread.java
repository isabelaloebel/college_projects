class MyThread extends Thread{
	private int t;
	private String threadName;

	MyThread(String name, int ti){
		threadName = name;
		t = ti;
		System.out.println("Creating" + threadName);

	}

	public void run(){
		System.out.println("Running " + threadName);
		try{
			for(int i = 10; i > 0; i--)
			{
				System.out.println("Thread: " + threadName + "--> " + i);
				Thread.sleep(t);
			}
		} catch (InterruptedException e){
			System.out.println("Thread: " + threadName + " interrupted");
		}
	System.out.println("Thread " + threadName + " concluded" );
	}
}

//-----------------------------------------------
class SeuThread extends Thread{
	private int t;
	private String threadName;

	SeuThread(String name, int ti){
		threadName = name;
		t = ti;
		System.out.println("Creating" + threadName);

	}

	public void run(){
		System.out.println("Running " + threadName);
		try{
			for(int i = 10; i > 0; i--)
			{
				System.out.println("Seu Thread: " + threadName + "--> " + i);
				Thread.sleep(t);
			}
		} catch (InterruptedException e){
			System.out.println("Seu Thread: " + threadName + " interrupted");
		}
	System.out.println("Thread " + threadName + " concluded" );
	}
}



public class FirstThread{
	
	public static void main(String args[])
	{
		MyThread t1 = new MyThread("Thread 1", 30);
		t1.start();
		MyThread t2 = new MyThread("Thread 2", 60);
		t2.start();
		SeuThread t3 = new SeuThread("Seu Thread 1", 100);
		t3.start();

	}
}