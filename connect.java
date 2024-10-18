import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoDBConnectionExample {
    public static void main(String[] args) {
        /// THIS IS BACKEND CODE USING JAVA FOR OUR BACKEND APPLICATION
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://<admin>:<admin123>@cluster0.mongodb.net/test?retryWrites=true&w=majority";
        
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("test");
            System.out.println("Connected to the database successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
