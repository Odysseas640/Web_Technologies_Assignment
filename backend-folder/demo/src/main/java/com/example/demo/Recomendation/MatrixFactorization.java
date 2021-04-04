package com.example.demo.Recomendation;

import com.example.demo.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

//@Service
public class MatrixFactorization {
    private UserRepository userRepository;
    private AppartmentRepository appartmentRepository;
    private ReviewRepository reviewRepository;
    private UserVectorRepository userVectorRepository;
    private AppViewRepository appViewRepository;
    private SearchRepository searchRepository;
    int users ;//= (int) userRepository.count();
    int apartments ;//= (int) appartmentRepository.count();
    private ArrayList<User> allUsers;
    private ArrayList<appartment> allAppartments;
    int genres = 6;//Number of Latent features
    double[][] V;
    double[][] F;
    double[][] R;
    int min_steps = 10000; int max_steps = 30000; double h = 0.0005; double beta = 0.0005;

    @Autowired
    public MatrixFactorization(UserRepository userRepository, AppartmentRepository appartmentRepository, ReviewRepository reviewRepository, AppViewRepository appViewRepository, SearchRepository searchRepository, UserVectorRepository userVectorRepository) {
        System.out.println("MATRIX FACTORIZATION STARTS");
        this.userRepository = userRepository;
        System.out.println("Counting users");
        this.users= this.userRepository.getAllByIsRenterOrderByUserNameAsc(true).size();
        System.out.println("Counted users: " + this.users);
        this.appartmentRepository = appartmentRepository;
        System.out.println("Counting apartments");
        this.apartments= (int) this.appartmentRepository.count();
        System.out.println("Counted apartments: " + this.apartments);
        this.reviewRepository = reviewRepository;
        this.userVectorRepository = userVectorRepository;
        this.searchRepository = searchRepository;
        this.appViewRepository = appViewRepository;
        /////////////////////
        V = new double[users][genres];
        F = new double[genres][apartments];
        R = new double[users][apartments];
        ///////////////
        int reviewzz = 0;
        int app_viewz = 0;
        int search_viewz = 0;
        System.out.println("GATHERING KNOWN DATA");
        this.allUsers = (ArrayList<User>) this.userRepository.getAllByIsRenterOrderByUserNameAsc(true); // USERS LIST (SORTED)
        System.out.println("Users gathered");
        this.allAppartments = (ArrayList<appartment>) this.appartmentRepository.findAll(); // APARTMENT LIST
        System.out.println("Apartments gathered");
        for (int j=0; j<apartments; j++) {
            System.out.println("(1) Apartment " + j);
            ArrayList<Review> reviewz = (ArrayList<Review>) this.reviewRepository.findAllByAppartment(allAppartments.get(j));
            for (int r=0; r< reviewz.size(); r++) {
                String user_name = reviewz.get(r).getUserName();
                for (int i=0; i<users; i++) {
                    if (user_name.equals(allUsers.get(i).getUserName())) {
                        reviewzz++;
                        if (R[i][j] == 0) // First review of user i for apartment j
                            R[i][j] = reviewz.get(r).getNumber();
                        else
                            R[i][j] = (R[i][j] + reviewz.get(r).getNumber()) / 2;
                        //   System.out.println(R[i][j]);
                    }
                }
            }
        }
        //       Data sparsity compensation
        // For every user, find apartments he's seen and mark them as a 3 (if he hasn't reviewed them)
        System.out.println("Calculating apartment views");
        for (int i=0; i<users; i++) {
            System.out.println("(2) User " + i);
            ArrayList<AppView> appViewz = (ArrayList<AppView>) this.appViewRepository.findAllByUser(allUsers.get(i));
            for (int r=0; r<appViewz.size(); r++) {
                appartment ap = appViewz.get(r).getApp();
                for (int j=0; j<apartments; j++) {
                    if (ap.getId().equals(allAppartments.get(j).getId())) {
                        app_viewz++;
                        if (R[i][j] == 0) // User i has not rated apartment j
                            R[i][j] = -2.8; // I'm using negative numbers to know what has been modified in this "apartment views" stage
                        else if (R[i][j] < -1 && R[i][j] >= -4.2)
                            R[i][j] -= 0.15;
                    }
                }
            }
        }
        for (int i=0; i<users; i++) {
            for (int j=0; j<apartments; j++) {
                R[i][j] = java.lang.Math.abs(R[i][j]);
            }
        }
        // For every user, find apartments that match the searches he's made, and mark them as 2 (if he hasn't reviewed or visited them)
        System.out.println("Calculating searches made");
        for (int i=0; i<users; i++) {
            System.out.println("(3) User " + i);
            ArrayList<Search> searchViewz = this.searchRepository.findAllByUser(allUsers.get(i));
            for (int r=0; r<searchViewz.size(); r++) {
                String lokation = searchViewz.get(r).getSearchlocation();
                for (int j=0; j<apartments; j++) {
                    if (lokation.equals(allAppartments.get(j).getLocation())) {
                        search_viewz++;
                        if (R[i][j] == 0) // User i has not rated or viewed apartment j
                            R[i][j] = -2.5;
                        else if (R[i][j] < -0.5 && R[i][j] >= -3.8) {
                            R[i][j] -= 0.1;
                        }
                    }
                }
            }
        }
        double knowns = 0; double unknowns = 0;
        for (int i=0; i<users; i++) {
            for (int j=0; j<apartments; j++) {
                R[i][j] = java.lang.Math.abs(R[i][j]);
                if (R[i][j] == 0)
                    unknowns += 1;
                else
                    knowns += 1;
            }
        }
        System.out.printf("Knowns: %f\n", knowns);
        System.out.printf("Unknowns: %f\n", unknowns);
        System.out.printf("Percentage known: %f %%\n", 100 * knowns/(unknowns+knowns));
        System.out.println("reviewzz: " + reviewzz);
        System.out.println("app_Viewz: " + app_viewz);
        System.out.println("search_Viewz: " + search_viewz);
        System.out.println("GATHERED KNOWN DATA, STARTING FACTORIZATION");
        for (int i = 0; i < users; ++i) {
            for (int j = 0; j < genres; ++j) {
                V[i][j] = ThreadLocalRandom.current().nextGaussian();
            }
        }
        for (int i = 0; i < genres; ++i) {
            for (int j = 0; j < apartments; ++j) {
                F[i][j] = ThreadLocalRandom.current().nextGaussian();
            }
        }
        double previous_e = 0;
        int s=0;
        while (true) {
            s++;
            System.out.print("Step " + s + "  -  ");
            for (int i=0; i<users; i++) {
                for (int j=0; j<apartments; j++) {
                    if (R[i][j] > 0) {
                        double dot = 0.0;
                        for (int k=0; k<genres; k++) {
                            dot += V[i][k] * F[k][j];
                        }
                        double eij = R[i][j] - dot;
                        for (int k=0; k<genres; k++) {
                            V[i][k] += h * (2 * eij * F[k][j] - beta * V[i][k]);
                            F[k][j] += h * (2 * eij * V[i][k] - beta * F[k][j]);
                        }
                    }
                }
            }
            double e = 0;
            double sumOfAllErrors = 0; // This is more intuitive for testing
//            System.out.printf("%d\t, %d\n",users,apartments);
            for (int i=0; i<users; i++) { // possible mistake here
                for (int j=0; j<apartments; j++) {
                    if (R[i][j] > 0) {
                        double dot = 0.0;
                        for (int k=0; k<genres; k++) {
                            dot += V[i][k] * F[k][j];
                        }
                        sumOfAllErrors += java.lang.Math.abs(R[i][j] - dot);
                        e += ((R[i][j] - dot) * (R[i][j] - dot));
//                        for (int k=0; k<genres; k++) {
//                            e += ((beta / 2) * (P[i][k] * P[i][k] + Q[k][j] * Q[k][j]));
//                        }
                    }
                }
            }
            e = e / reviewzz; // 34.670 known reviews
            e = java.lang.Math.sqrt(e);
            double difference = previous_e - e;
            System.out.printf("e: %9f, Sum Of All Errors: %f  -  ", e, sumOfAllErrors);
            if ((difference <= 0 && s > min_steps) || s > max_steps) // If error hasn't been reduced, and we've done a large enough amount of min_steps
                break;
            System.out.printf("Reduction of e: %9f\n", difference);
            previous_e = e;
        }
        double[][] result = new double[users][apartments];
        for (int i=0; i<users; i++) {
            for (int j=0; j<apartments; j++) {
                result[i][j] = 0;
                for (int k=0; k<genres; k++) {
                    result[i][j] += V[i][k] * F[k][j];
                }
            }
        }
        System.out.println("MATRIX FACTORIZATION DONE, CALCULATING top6 USER VECTORS");
        for (int i=0; i<users; i++) { // For every user
            ArrayList<appartment> top6 = new ArrayList<>();
            for (int t=0; t<6; t++) { // Recommend this many apartments
                // Find this user's highest rated apartment.
                // Save it to the "top 5" list and make it 0 (so we don't find it again in the next iteration to get 5 apartments).
                double max_rating_found = -99999999;
                int max_rating_found_index = 0;
                for (int j=0; j<apartments; j++) {
                    if (result[i][j] > max_rating_found) {
                        max_rating_found = result[i][j];
                        max_rating_found_index = j;
                    }
                }
                if (i<10) System.out.println("Score: " + result[i][max_rating_found_index] + "_____");
                result[i][max_rating_found_index] = 0;
                top6.add(allAppartments.get(max_rating_found_index));
            }
            UserVector uv1 = new UserVector();
            uv1.setUserName(allUsers.get(i).getUserName());
            ArrayList<Integer> temp=new ArrayList<>();
            for(appartment app:top6) {
                temp.add(app.getId());
            }
            uv1.setIds(temp); // User vector is ready
            if (i<10 || users-i < 10) {
                System.out.print("User " + i + ", ");
                for (int v = 0; v < 6; v++) {
                    System.out.print("v_spot " + v + ": " + uv1.getIds().get(v) + ", ");
                }
                System.out.print("\n");
            }
            this.userVectorRepository.save(uv1);
        }
        System.out.println("DONE CREATING top6 USER VECTORS");
    }
}