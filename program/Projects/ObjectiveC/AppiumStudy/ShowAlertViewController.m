//
//  ShowAlertViewController.m
//  AppiumStudy
//
//  Created by Leonidas Feranda on 11/20/13.
//
//

#import "ShowAlertViewController.h"

@interface ShowAlertViewController ()

@end

@implementation ShowAlertViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)showAlert:(UIStoryboardSegue *)segue
{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"I am live!" message:@"More info..." delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:Nil,nil];
    [alert show];
}

@end
